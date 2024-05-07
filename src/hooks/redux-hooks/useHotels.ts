import {useAppSelector} from "./useAppSelector";

export function useHotels() {
    return useAppSelector(state => state.travel.hotels)
}