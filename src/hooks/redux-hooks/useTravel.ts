import {useAppSelector} from "./useAppSelector";

export function useTravel(){
    return useAppSelector(state => state.travel.travel)
}