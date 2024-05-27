import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import defaultThemeClass from "../../utils/defaultThemeClass";
import {THEME} from "../../constants";

export type DefaultThemeType = 'dark-theme' | 'light-theme' | 'default'


const defaultThemeContext = {
    theme: defaultThemeClass(),
    setTheme: (key: DefaultThemeType) => {},
    defaultThemeList: ['default', 'light-theme', 'dark-theme']
}


export const ThemeContext = createContext(defaultThemeContext)


export function ThemeContextProvider({children}: PropsWithChildren) {
    const context = useContext(ThemeContext)

    const setTheme = (newTheme: DefaultThemeType) => {
        const themeName = newTheme === 'default' ? defaultThemeClass() : newTheme
        localStorage.setItem(THEME, newTheme.toString())

        document.body.classList.remove('dark-theme')
        document.body.classList.remove('light-theme')
        document.body.classList.add(themeName)

        context.theme = newTheme
    }

    context.setTheme = setTheme

    return (
        <ThemeContext.Provider value={context}>
            {children}
        </ThemeContext.Provider>
    )
}