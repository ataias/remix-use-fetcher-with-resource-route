import type { MetaFunction } from "@remix-run/node";
import {
  Await,
  useFetcher,
  useRevalidator,
  useRouteError,
} from "@remix-run/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { loader as helloWorldLoader } from "./($lang).api.hello-world-1/route";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const run = (
  fetcher: ReturnType<typeof useFetcher<typeof helloWorldLoader>>,
  previousUrl: React.MutableRefObject<string | null>,
  url: string
) => {
  if (fetcher.state === "idle" && previousUrl.current !== url) {
    fetcher.load(url);
    previousUrl.current = url;
  }
};

export default function Index() {
  const revalidator = useRevalidator();

  useEffect(() => {
    console.log(">> state: ", revalidator.state);
    revalidator.revalidate();
  }, [revalidator]);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <SomeFetcher id={1} />
    </div>
  );
}

function SomeFetcher({ id }: { id: number }) {
  const fetcher = useFetcher<typeof helloWorldLoader>();

  const lang = "en-br";
  const [url, setUrl] = useState(`${lang}/api/hello-world-1?fetcher-1`);
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    run(fetcher, previousUrl, url);
  }, [fetcher, url]);

  useEffect(() => {
    let i = 0;
    setInterval(() => {
      i++;
      setUrl(`${lang}/api/hello-world-${i % 6}?Fetcher-${id}`);
    }, 500);
  }, [id]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={fetcher.data?.message}>
        {(message) => <p>{message}</p>}
      </Await>
    </Suspense>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error) console.error("Error Boundary _index:", error);
  return <div>Error _index</div>;
}
