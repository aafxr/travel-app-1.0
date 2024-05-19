import {useContext} from "react";
import {NewTravelContext} from "./NewTravel";

export function useNewTravelContext(){
    return useContext(NewTravelContext)
}