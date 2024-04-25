import { PassThrough } from "node:stream"
import type { EntryContext } from "@remix-run/node"
import { createReadableStreamFromReadable } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { isbot } from "isbot"
import { renderToPipeableStream, renderToString } from "react-dom/server"
import { ServerStyleSheet, ThemeProvider } from "styled-components"
import { StyleElement, StylesProvider } from "./styles-context"
import { RootLoaderData } from "./root"
import { dsTheme } from "./theme"

const ABORT_DELAY = 5_000

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const isBot = isbot(request.headers.get("user-agent"))
  const method = isBot ? "onAllReady" : "onShellReady"
  const sheet = new ServerStyleSheet()
  try {
    const { theme } = (remixContext.staticHandlerContext?.loaderData.root as RootLoaderData) ?? {}

    const App = ({ styles }: { styles?: StyleElement }) => {
      return (
        <ThemeProvider theme={dsTheme(theme === "dark")}>
          <StylesProvider value={styles}>
            <RemixServer context={remixContext} url={request.url} />
          </StylesProvider>
        </ThemeProvider>
      )
    }


    renderToString(sheet.collectStyles(<App />))
    const styles = sheet.getStyleElement()

    return new Promise<Response>((resolve, reject) => {
      let didError = false
      const { pipe, abort } = renderToPipeableStream(<App styles={styles} />, {
        [method]: () => {
          const body = new PassThrough()

          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set("Content-Type", "text/html")

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )
          pipe(body)
        },
        onShellError: (error: unknown) => {
          reject(error)
          // eslint-disable-next-line no-console
          console.error("onShellError", error)
        },
        onError: (error: unknown) => {
          didError = true
          // eslint-disable-next-line no-console
          console.error(error)
        },
      })

      setTimeout(abort, ABORT_DELAY)
    })
  } finally {
    sheet.seal()
  }
}
