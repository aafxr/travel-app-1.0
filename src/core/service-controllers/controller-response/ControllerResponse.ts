import {Action} from "../../classes";

export class ControllerResponse{
    ok: boolean
    message?:string
    action?:Action<any>
    constructor(options?: Partial<ControllerResponse>) {
        if(!options) options = {}

        this.ok = options.ok || true
        if(options.message) this.message = options.message
        if(options.action) this.action = options.action
    }
}