import {useAppSelector} from "./useAppSelector";

export function useMessages(){
    return useAppSelector(state => state.travel.messages)
}