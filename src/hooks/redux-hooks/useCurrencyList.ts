import {useAppSelector} from "./useAppSelector";
import {loadCurrency, addCurrency} from "../../redux/slices/currency-slice";

export function useCurrencyList() {
    const {list, loading, error} = useAppSelector(state => state.currency)
    return {list, loading, error, actions: {loadCurrency, addCurrency}}
}