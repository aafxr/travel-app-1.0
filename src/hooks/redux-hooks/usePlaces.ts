import {useAppSelector} from "./useAppSelector";
import {addPlace, removePlace, loadPlaces} from "../../redux/slices/places-slice";

export function usePlaces(){
    const {places,error, loading} = useAppSelector(state => state.places)
    return {places, error, loading, actions:{addPlace, removePlace, loadPlaces}}
}