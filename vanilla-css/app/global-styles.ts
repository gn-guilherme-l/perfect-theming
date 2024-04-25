import { createGlobalStyle } from "styled-components"
import { darkTheme, lightTheme, theme } from "./theme"

const GlobalStyles = createGlobalStyle`
    ${lightTheme}
    ${darkTheme}

    html,body {
        height: 100%;
    }

    body {
        background-color: ${theme.bg};
    }

    a:link,
    a:visited,
    a:hover,
    a:active {
        text-decoration: none;
    }

    * {
        -webkit-tap-highlight-color: transparent !important;
    }
`;

export default GlobalStyles
