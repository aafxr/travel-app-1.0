import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function useActionSubject() {
    return useContext(SubjectContext).s_action
}