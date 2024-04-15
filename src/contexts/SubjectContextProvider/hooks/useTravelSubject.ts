import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function useTravelSubject(){
    return useContext(SubjectContext).s_travel
}