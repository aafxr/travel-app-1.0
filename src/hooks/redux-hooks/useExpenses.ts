import {useAppSelector} from "./useAppSelector";

export function useExpenses(){
    return useAppSelector(state => state.travel.expenses)
}