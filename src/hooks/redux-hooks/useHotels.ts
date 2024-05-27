import {useAppSelector} from "./useAppSelector";
import {addHotel, removeHotel, loadHotels} from "../../redux/slices/hotel-slice";

export function useHotels() {
     const state = useAppSelector(state => state.hotels)

    return {...state, actions: {loadHotels, addHotel, removeHotel}}
}