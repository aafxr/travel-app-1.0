import {useEffect} from "react";
import {fetchCurrency} from "../../api/fetch";
import {Currency} from "../../core/classes/store/Currency";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {CurrencyController} from "../../core/service-controllers/CurrencyController";
import {useAppContext} from "../../contexts/AppContextProvider";

export function LoadCurrencyComponent(){
    const context = useAppContext()

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchCurrency(new Date())
                if(res && res.ok){
                    const data = res.data
                    const entries = Object.entries(data)
                    const currencyList: Currency[] = []
                    for(const [k,v] of entries) {
                        const d = k.split('.').reverse().join('.')
                        const c = new Currency({
                            date: new Date(d),
                            list: v,
                        })
                        currencyList.push(c)
                    }

                    await Promise.all(
                        currencyList.map(c => CurrencyController.create(context, c).catch(defaultHandleError))
                    )
                }
            } catch (e){
                defaultHandleError(e as Error)
            }
        })()
    }, []);



    return <></>
}