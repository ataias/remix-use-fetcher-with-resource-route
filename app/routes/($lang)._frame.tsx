import { Outlet } from "@remix-run/react";

export default function Frame() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <div>Error frame</div>;
}
