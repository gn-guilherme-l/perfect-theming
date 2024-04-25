import { createGlobalStyle } from "styled-components"
import { Theme } from "./theme"

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  html,body {
      height: 100%;
  }

  body {
      background-color: ${({ theme }) => theme.bg};
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
