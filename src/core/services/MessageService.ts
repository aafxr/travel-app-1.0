import {Action, Context, Message} from "../classes";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {ActionService} from "./ActionService";
import {MessageError} from "../errors";
import {DB} from "../db/DB";

export class MessageService{
    static async create(ctx: Context, message: Message){
        const action = new Action({
            action: ActionType.ADD,
            entity: StoreName.MESSAGE,
            data: message,
            user_id: message.from
        })

        try {
            await DB.add(StoreName.MESSAGE, message)
        }catch (e){
            throw MessageError.messageAlreadyExist(message)
        }
        await ActionService.create(ctx, action)
        return message
    }

    static async read(ctx: Context, messageID:string){
        return await DB.getOne(StoreName.MESSAGE, messageID)
    }

    static async readAll(ctx: Context, ...messageIDs:string[]){
        const result: Message[] = []
        for (const m_id of messageIDs){
            const m = await DB.getOne(StoreName.MESSAGE, m_id)
            if(m) result.push(new Message(m))
        }
        return result
    }

    static async readAllByTravelID(context: Context, travelID: string){
        const messages = await DB.getManyFromIndex<Message>(StoreName.MESSAGE, "primary_entity_id", travelID)
        return messages.map(m => new Message(m))
    }

    static async update(ctx: Context, message:Message){
        const ext = await DB.getOne(StoreName.MESSAGE, message.id)
        if(!ext) throw MessageError.updateBeforeCreate(message)

        const action = new Action({
            action: ActionType.UPDATE,
            entity: StoreName.MESSAGE,
            data: message,
            user_id: message.from
        })

        await DB.update(StoreName.MESSAGE, message)
        await ActionService.create(ctx, action)
        return message
    }

    static async delete(ctx: Context, message: Message) {
        const ext = await DB.getOne(StoreName.MESSAGE, message.id)
        if(!ext) throw MessageError.deleteBeforeCreate(message)

        const action = new Action({
            action: ActionType.DELETE,
            entity: StoreName.MESSAGE,
            data: message,
            user_id: message.from
        })

        await DB.delete(StoreName.MESSAGE, message.id)
        await ActionService.create(ctx, action)
        return message
    }
}