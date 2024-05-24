import {useEffect} from "react";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {CurrencyController} from "../../core/service-controllers/CurrencyController";
import {useAppContext} from "../../contexts/AppContextProvider";

export function LoadCurrencyComponent(){
    const context = useAppContext()

    useEffect(() => {
        (async () => {
            try {
                const d = new Date()
                await CurrencyController.readByRange(context, d, d)
            } catch (e){
                defaultHandleError(e as Error)
            }
        })()
    }, []);



    return <></>
}