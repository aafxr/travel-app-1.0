import {Socket} from "socket.io-client";
import {Travel, User} from "../store";

export class Context {
    user?: User
    travel?: Travel
    socket?: Socket

    constructor(context?: Context) {
        if(!context) return

        if(context.user) this.user = context.user
        if(context.travel) this.travel = context.travel
        if(context.socket) this.socket = context.socket
    }


    setUser(user?: User) {
        this.user = user
    }

    setTravel(travel?: Travel) {
        this.travel = travel
    }

    setSocket(socket?: Socket){
        this.socket = socket
    }

    get isLogIn(){
        return !!(this.user && Boolean(this.user.token) && Boolean(this.user.refresh_token));
    }

}