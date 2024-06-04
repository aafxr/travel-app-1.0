import {useEffect} from "react";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {CurrencyController} from "../../core/service-controllers/CurrencyController";
import {useAppContext} from "../../contexts/AppContextProvider";

export function LoadCurrencyComponent(){
    const context = useAppContext()

    useEffect(() => {
        (async () => {
            try {
                const to = new Date()
                const from = new Date(to.getFullYear(), 0, 1)

                await CurrencyController.readByRange(context, from, to)
            } catch (e){
                defaultHandleError(e as Error)
            }
        })()
    }, []);



    return <></>
}