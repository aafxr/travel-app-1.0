import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function useUserSubject(){
    return useContext(SubjectContext).s_user
}