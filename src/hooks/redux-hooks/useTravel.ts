import {useAppSelector} from "./useAppSelector";
import {loadTravel, updateTravel} from "../../redux/slices/travel-slice";

export function useTravel(){
    const {travel, error, loading} = useAppSelector(state => state.travel)
    return {travel, error, loading, actions: {loadTravel, updateTravel}}
}