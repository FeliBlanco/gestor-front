import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

export default function useUserTheme() {
    const {getTheme, changeTheme} = useContext(ThemeContext)

    return {
        getTheme,
        changeTheme
    }
}