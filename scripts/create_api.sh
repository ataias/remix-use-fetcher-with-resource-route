#!/usr/bin/env bash

for i in $(seq 5); do
mkdir app/routes/'($lang).api.hello-world-'$i
cat > app/routes/'($lang).api.hello-world-'$i/route.tsx<< EOF
import { data } from '@remix-run/react'

export async function loader() {
  const messagePromise = (async () => {
    await sleep(randomIntFromInterval(100, 200));
    return "hello world ${i}"
  })();
  return data({
    message: messagePromise,
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
EOF
done