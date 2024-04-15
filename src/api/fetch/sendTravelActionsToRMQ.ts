import aFetch from "../../axios";
import {Action} from "../../core/classes";

/**
 * отправляет action в очередь rabitmq
 * @param travelActions
 */
export async function sendTravelActionsToRMQ(...travelActions: Action<any>[]){
    return await aFetch.post('/rmq/put/travel/', travelActions)
}