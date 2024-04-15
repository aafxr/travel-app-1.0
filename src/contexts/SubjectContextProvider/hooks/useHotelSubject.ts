import {useContext} from "react";
import {SubjectContext} from "../SubjectContextProvider";

export function useHotelSubject() {
    return useContext(SubjectContext).s_hotel
}