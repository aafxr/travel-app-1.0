import {nanoid} from "nanoid";

import {MessageDto} from "../dto/Message.dto";
import {User} from "./User";

export class Message{
    id: string
    date: Date
    from: string
    text: string
    primary_entity_id: string

    constructor(msg: Partial<Message> | MessageDto) {
        this.id = msg.id ? msg.id : nanoid(16)
        this.date = msg.date ? new Date(msg.date) : new Date()
        this.from = msg.from ? msg.from : 'anonym'
        this.text = msg.text ? msg.text : ''
        this.primary_entity_id = msg.primary_entity_id ? msg.primary_entity_id : 'unknown'
    }


    static isSelf(msg:Message, user?: User | undefined | null){
        return msg.from === user?.id
    }
}