import {useAppSelector} from "./useAppSelector";

export function useLimits(){
    return useAppSelector(state => state.travel.limits)
}