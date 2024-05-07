import {useAppSelector} from "./useAppSelector";

export function useMembers(){
    return useAppSelector(state => state.travel.members)
}