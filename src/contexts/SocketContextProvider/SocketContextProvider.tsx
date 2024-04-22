import {Outlet} from "react-router-dom";
import {io, Socket} from "socket.io-client";
import {createContext, useEffect, useRef, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {ActionService} from "../../core/services/ActionService";
import {TravelController} from "../../core/service-controllers";
import {useAppContext, useUser} from "../AppContextProvider";
import {useActionSubject} from "../SubjectContextProvider";
import {SocketMessageType} from "./SocketMessageType";
import {Action, Travel} from "../../core/classes";
import socketManagement from "./socketManagement";
import {StoreName} from "../../types/StoreName";
import {DB} from "../../core/db/DB";


export type SocketContextType = {
    socket?: Socket | undefined
    errorMessage?: string
}


export const  SocketContext = createContext<SocketContextType>({})



export function SocketContextProvider(){
    const [state, setState] = useState<SocketContextType>({})
    const context = useAppContext()
    const user = useUser()
    const init = useRef<Record<string, any>>({})
    const actionSubject = useActionSubject()

    useEffect(() => {
        if(!user) return
        if(init.current.initialization) return

        const handle = socketManagement(context)

        init.current.initialization = true
        const socket =  io(process.env.REACT_APP_SOCKET_URL as string) //{ host: process.env.REACT_APP_SOCKET_HOST ,port:process.env.REACT_APP_SOCKET_PORT, secure: true}
        console.log(process.env.REACT_APP_SOCKET_URL)
        console.log(socket)

        socket.on('connect', () => {
            console.log('socket connect')
            DB.getAll<Travel>(StoreName.TRAVEL)
                .then(travels => {
                    const ids = travels.map(t => t.id)
                    socket.emit('travel:join',{travelID: ids})
                    socket.emit('travel:join:result', console.log)
                })
                .catch(defaultHandleError)
        })

        socket.on('disconnect', () => {
            console.log('socket disconnect')
            // setState({socket: undefined})
            // context.setSocket(null)
        })

        socket.on('connect_error', (err: Error) => {
            console.error(err)
            setState({...state, errorMessage: err.message})
        })

        // socket.on(SMEType.MESSAGE, handle.newTravelMessage)
        // socket.on(SMEType.MESSAGE, console.log)
        // socket.on(SMEType.MESSAGE_RESULT, console.log)
        // socket.on(SMEType.TRAVEL_ACTION, handle.newTravelAction)
        // socket.on(SMEType.TRAVEL_ACTION, console.log)
        // socket.on(SMEType.TRAVEL_ACTION_RESULT, console.log)
        // socket.on(SMEType.EXPENSE_ACTION, handle.newExpenseAction)
        // socket.on(SMEType.EXPENSE_ACTION, console.log)
        // socket.on(SMEType.EXPENSE_ACTION_RESULT, console.log)
        // socket.on(SMEType.LIMIT_ACTION, handle.newLimitAction)
        // socket.on(SMEType.LIMIT_ACTION, console.log)
        // socket.on(SMEType.LIMIT_ACTION_RESULT, console.log)


        socket.on(SocketMessageType.ACTION, async (action: Action<any>) => {
            console.log(action, typeof action)
            try{
                // await DB.add(StoreName.ACTION, action)
                const result = await ActionService.prepareNewAction(action,user)
                if(    result
                    && context.travel
                    && context.travel.id
                    && action.entity === StoreName.TRAVEL
                    && context.travel.id === action.data.id
                ){
                    const travel = await TravelController.read(context, action.data.id)
                    travel && context.setTravel(travel)
                }
                result && actionSubject.next(action)
            } catch (e){
                console.error(e)
                defaultHandleError(e as Error)
            }
        })

        context.setSocket(socket)
        setState({socket})

        return () => { context.setSocket(null) }
    }, [user, state])


    return (
        <SocketContext.Provider value={state}>
            <Outlet/>
        </SocketContext.Provider>
    )
}