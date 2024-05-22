import {Action} from "../../classes";
import {ActionDto} from "../../classes/dto";

export class ControllerResponse{
    ok: boolean
    message?:string
    action?:Action<any>
    actionDTO?:ActionDto

    constructor(options?: Partial<ControllerResponse>) {
        if(!options) options = {}

        this.ok = options.ok || true
        if(options.message) this.message = options.message
        if(options.action) this.action = options.action
        if(options.actionDTO) this.actionDTO = options.actionDTO
    }
}