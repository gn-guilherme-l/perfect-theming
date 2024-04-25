import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from "@remix-run/react"
import { LoaderFunctionArgs, SerializeFrom } from "@remix-run/node";
import GlobalStyles from "./global-styles"
import { useStyles } from "./styles-context"
import { THEME_COOKIE_NAME } from "./theme-cookie"

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("cookie") ?? ""
    const theme = cookie
      .split("; ")
      .find((row) => row.startsWith(`${THEME_COOKIE_NAME}=`))
      ?.split("=")[1] ?? "light"
    return json({ theme })
}

export type RootLoaderData = SerializeFrom<typeof loader>;

export default function App() {
  const styles = useStyles()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <GlobalStyles />
        {styles}
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
