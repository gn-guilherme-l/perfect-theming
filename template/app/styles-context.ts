import { createContext, useContext } from "react"
import { ServerStyleSheet } from "styled-components"

export type StyleElement = ReturnType<ServerStyleSheet["getStyleElement"]>

const StylesContext = createContext<StyleElement | undefined>(undefined)

export const StylesProvider = StylesContext.Provider

export const useStyles = () => useContext(StylesContext)
