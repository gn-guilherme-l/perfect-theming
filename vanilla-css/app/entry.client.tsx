import { RemixBrowser } from "@remix-run/react"
import { startTransition, StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { StylesProvider } from "./styles-context"

async function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <App />
    )
  })
}

const App = () => {
  return (
    <StrictMode>
      <StylesProvider value={undefined}>
        <RemixBrowser />
      </StylesProvider>
    </StrictMode>
  )
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1)
}
