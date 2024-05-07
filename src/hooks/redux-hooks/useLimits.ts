import {useAppSelector} from "./useAppSelector";
import {loadLimits, addLimit, removeLimit} from "../../redux/slices/limit-slice";

export function useLimits(){
    const {limits,error, loading} = useAppSelector(state => state.limits)
    return {limits,error, loading, actions: {loadLimits,addLimit, removeLimit}}
}