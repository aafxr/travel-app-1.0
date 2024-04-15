import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function useExpenseSubject(){
    return useContext(SubjectContext).s_expense
}