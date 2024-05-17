import {Outlet} from "react-router-dom";
import {io, Socket} from "socket.io-client";
import {createContext, useEffect, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {actionHandler} from "../../utils/action-handler/action-handler";
import {SocketMessageEntityType} from "./SocketMessageEntityType";
import {useAppContext} from "../AppContextProvider";
import {StoreName} from "../../types/StoreName";
import {Travel} from "../../core/classes";
import {DB} from "../../core/db/DB";
import {
    useActionSubject,
    useExpenseSubject,
    useHotelSubject,
    useLimitSubject,
    usePhotoSubject,
    usePlaceSubject,
    useTravelSubject
} from "../SubjectContextProvider";
import {useUser} from "../../hooks/redux-hooks";


export type SocketContextType = {
    socket?: Socket | undefined
    errorMessage?: string
}


export const  SocketContext = createContext<SocketContextType>({})



export function SocketContextProvider(){
    const [state, setState] = useState<SocketContextType>({})
    const context = useAppContext()
    const {user} = useUser()

    const actionSubject = useActionSubject()
    const travelSubject = useTravelSubject()
    const expenseSubject = useExpenseSubject()
    const limitSubject = useLimitSubject()
    const placeSubject = usePlaceSubject()
    const hotelSubject = useHotelSubject()
    const photoSubject = usePhotoSubject()

    useEffect(() => {
        if(!user) return
        if(state.socket) return

        // const handle = socketManagement(context)

        const socket =  io(process.env.REACT_APP_SOCKET_URL as string) //{ host: process.env.REACT_APP_SOCKET_HOST ,port:process.env.REACT_APP_SOCKET_PORT, secure: true}

        socket.on('connect', () => {
            console.log('socket connect')
            DB.getAll<Travel>(StoreName.TRAVEL)
                .then(travels => {
                    // const ids = travels.map(t => t.id)
                    socket.emit('travel:join',{travelID: ['all']})
                    socket.emit('travel:join:result', console.log)
                })
                .catch(defaultHandleError)
        })

        socket.on('disconnect', () => {
            console.log('socket disconnect')
            context.setSocket()
        })

        socket.on('connect_error', (err: Error) => {
            console.error(err)
            setState(prev => ({...prev, errorMessage: err.message}))
        })


        const onAction = actionHandler({
            context,
            actionSubject,
            travelSubject,
            expenseSubject,
            limitSubject,
            placeSubject,
            hotelSubject,
            photoSubject,
        })

        socket.on(SocketMessageEntityType.ACTION, onAction)

        setState({socket})
    }, [])


    return (
        <SocketContext.Provider value={state}>
            <Outlet/>
        </SocketContext.Provider>
    )
}