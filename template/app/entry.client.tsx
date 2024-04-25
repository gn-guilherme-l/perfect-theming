import { ThemeProvider } from "styled-components"
import { RemixBrowser } from "@remix-run/react"
import { startTransition, StrictMode, useEffect } from "react"
import { hydrateRoot } from "react-dom/client"
import { dsTheme,   useThemeDetector } from "./theme"
import { StylesProvider } from "./styles-context"
import { THEME_COOKIE_NAME } from "./theme-cookie"

async function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <App />
    )
  })
}

const App = () => {
    const isDarkTheme = useThemeDetector()
    const theme = isDarkTheme ? "dark" : "light"
    useEffect(() => {
      document.cookie = `${THEME_COOKIE_NAME}=${theme}`
    }, [theme])

  return (
    <StrictMode>
      <ThemeProvider theme={dsTheme(isDarkTheme)}>
        <StylesProvider value={undefined}>
          <RemixBrowser />
        </StylesProvider>
      </ThemeProvider>
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
