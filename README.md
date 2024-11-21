# Fetcher Revalidation Error with lazyRouteDiscovery

This repository reproduces a bug in Remix 2.14.0 with useFetcher for non-previously discovered routes. It happens when `revalidator.revalidate()` is called with routes that need to be discovered.

## Reproducing

Run the dev server:

```shellscript
npm run dev
```

Open a new browser tab and hit `localhost:5173`

You should see the page hits an Error boundary, showing `Error _index`. In the console, you should see:

```txt
($lang)._frame._index.tsx:75 Error Boundary _index: ErrorResponseImpl {status: 404, statusText: 'Not Found', internal: true, data: 'Error: No route matches URL "/en-br/api/hello-world-1?fetcher-1"', error: Error: No route matches URL "/en-br/api/hello-world-1?fetcher-1"
    at getInternalRouterError (htt…} Error Component Stack
    at ErrorBoundary (($lang)._frame._index.tsx:73:17)
    at RenderErrorBoundary (@remix-run_react.js?v=d2b72bff:367:5)
    at Outlet (@remix-run_react.js?v=d2b72bff:775:26)
    at Frame (<anonymous>)
    at RenderedRoute (@remix-run_react.js?v=d2b72bff:407:5)
    at RenderErrorBoundary (@remix-run_react.js?v=d2b72bff:367:5)
    at Outlet (@remix-run_react.js?v=d2b72bff:775:26)
    at App (<anonymous>)
    at body (<anonymous>)
    at html (<anonymous>)
    at Layout (root.tsx:45:26)
```

For more info, check [app/routes/($lang)._frame._index.tsx](app/routes/($lang)._frame._index.tsx)
