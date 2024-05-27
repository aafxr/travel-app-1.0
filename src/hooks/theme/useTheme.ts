import {useContext} from "react";
import {ThemeContext} from "../../contexts/ThemeContextProvider";

export function useTheme(){
    return useContext(ThemeContext)
}