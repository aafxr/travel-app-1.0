import {useAppSelector} from "./useAppSelector";
import {addHotel, removeHotel, loadHotels} from "../../redux/slices/hotel-slice";

export function useHotels() {
     const {hotels, error, loading} = useAppSelector(state => state.hotels)

    return {hotels, error, loading, actions: {loadHotels, addHotel, removeHotel}}
}