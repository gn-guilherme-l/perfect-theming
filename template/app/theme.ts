import { useEffect, useState } from "react"
import { DefaultTheme } from "styled-components"

declare module "styled-components" {
    export interface DefaultTheme {
        name: string
        fg: string
        bg: string
    }
}

export type Theme = DefaultTheme

export const lightTheme: Theme = { name: "light", bg: "Coral", fg: "CornflowerBlue" }
export const darkTheme: Theme = { name: "dark", bg: "CornflowerBlue", fg: "Coral" }

const darkThemeMediaQuery = "(prefers-color-scheme: dark)"

export const useThemeDetector = () => {
    const matchDarkTheme = typeof window !== "undefined" && window.matchMedia?.(darkThemeMediaQuery)
    const [isDarkThemePreferred, setIsDarkThemePreferred] = useState(!!(matchDarkTheme && matchDarkTheme.matches))

    useEffect(() => {
        if (!matchDarkTheme) return

        const onChange = (e: MediaQueryListEvent) => setIsDarkThemePreferred(e.matches)
        matchDarkTheme.addEventListener("change", onChange)
        return () => matchDarkTheme.removeEventListener("change", onChange)
    }, [matchDarkTheme])

    return isDarkThemePreferred
}

export const dsTheme = (darkMode: boolean) => {
    return darkMode ? darkTheme : lightTheme
}
