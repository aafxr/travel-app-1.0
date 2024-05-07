import {useAppSelector} from "./useAppSelector";

export function usePlaces(){
    return useAppSelector(state => state.travel.places)
}