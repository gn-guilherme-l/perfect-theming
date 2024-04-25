import { css } from "styled-components"

export const theme = {
    bg: "var(--bg)",
    fg: "var(--fg)"
}

export const lightTheme = css`
    :root {
        --bg: Coral;
        --fg: CornflowerBlue;
    }
`

export const darkTheme = css`
    @media (prefers-color-scheme: dark) {
        :root {
            --bg: CornflowerBlue;
            --fg: Coral;
        }
    }
`
