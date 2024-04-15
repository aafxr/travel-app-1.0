import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function usePlaceSubject(){
    return useContext(SubjectContext).s_place
}