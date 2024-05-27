import {useAppSelector} from "./useAppSelector";
import {addPlace, removePlace, loadPlaces} from "../../redux/slices/places-slice";

export function usePlaces(){
    const state = useAppSelector(state => state.places)
    return {...state, actions:{addPlace, removePlace, loadPlaces}}
}