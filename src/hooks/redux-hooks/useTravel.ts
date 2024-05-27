import {useAppSelector} from "./useAppSelector";
import {loadTravel, updateTravel} from "../../redux/slices/travel-slice";

export function useTravel(){
    const state = useAppSelector(state => state.travel)
    return {...state, actions: {loadTravel, updateTravel}}
}