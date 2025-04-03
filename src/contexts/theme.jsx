import { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext()

export default function ThemeContextProvider({children}) {

    const [getTheme, setTheme] = useState('dark')

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if(theme) {
            setTheme(theme)
        }
    }, [])

    const changeTheme = () => {
        const theme = getTheme == 'light' ? 'dark' : 'light'
        setTheme(i => theme)
        localStorage.setItem('theme', theme)
    }

    return (
        <ThemeContext.Provider value={{getTheme, changeTheme}}>{children}</ThemeContext.Provider>
    )
}