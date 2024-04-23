import {Outlet} from "react-router-dom";
import {io, Socket} from "socket.io-client";
import {createContext, useEffect, useRef, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {SocketMessageEntityType} from "./SocketMessageEntityType";
import {useAppContext, useUser} from "../AppContextProvider";
import {
    useActionSubject,
    useExpenseSubject, useHotelSubject,
    useLimitSubject,
    usePlaceSubject,
    useTravelSubject
} from "../SubjectContextProvider";
import socketManagement from "./socketManagement";
import {Action, Travel} from "../../core/classes";
import {ActionDto} from "../../core/classes/dto";
import {Update} from "../../core/classes/Update";
import {StoreName} from "../../types/StoreName";
import {DB} from "../../core/db/DB";
import {ActionController} from "../../core/service-controllers";


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

    const travelSubject = useTravelSubject()
    const expenseSubject = useExpenseSubject()
    const limitSubject = useLimitSubject()
    const placeSubject = usePlaceSubject()
    const hotelSubject = useHotelSubject()

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


        socket.on(SocketMessageEntityType.ACTION, async (actionDTO: ActionDto) => {
            console.log(actionDTO, typeof actionDTO)
            try{
                const result = await ActionController.add(context, actionDTO)
                if(!result.ok) {
                    console.log(result)
                    return
                }

                const action = result.action!
                actionSubject.next(action)

                switch (action.entity){
                    case StoreName.TRAVEL:
                        const travel = await Update.travel(action)
                        if (travel) travelSubject.next(travel)
                        break
                }

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