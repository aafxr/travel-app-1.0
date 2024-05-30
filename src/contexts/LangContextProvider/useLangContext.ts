import {useContext} from "react";
import {LangContext} from "./LangContextProvider";

export function useLangContext() {
    return useContext(LangContext)
}