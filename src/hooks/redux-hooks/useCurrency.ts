import {useAppSelector} from "./useAppSelector";
import {loadCurrency} from "../../redux/slices/currency-slice";

export function useCurrency() {
    const state = useAppSelector(state => state.currency)
    return {...state, actions:{loadCurrency}}
}