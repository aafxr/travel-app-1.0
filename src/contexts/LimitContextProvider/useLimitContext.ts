import {useContext} from "react";
import {LimitContext} from "./LimitContextProvider";

export function useLimitContext(){
    return useContext(LimitContext)
}