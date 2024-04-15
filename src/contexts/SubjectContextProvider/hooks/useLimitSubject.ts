import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function useLimitSubject(){
    return useContext(SubjectContext).s_limit
}