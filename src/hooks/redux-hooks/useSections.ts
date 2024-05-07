import {useAppSelector} from "./useAppSelector";

export function useSections(){
    return useAppSelector(state => state.travel.sections)
}