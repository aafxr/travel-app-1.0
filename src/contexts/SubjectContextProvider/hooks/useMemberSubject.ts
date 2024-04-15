import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function useMemberSubject() {
    return useContext(SubjectContext).s_member
}