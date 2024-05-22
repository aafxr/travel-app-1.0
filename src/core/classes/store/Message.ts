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


    static getPartial(msg: Partial<Message> | MessageDto = {}) {
        const res : Partial<Message> = {}
        if(msg.id !== undefined) res.id = msg.id
        if(msg.date !== undefined) res.date = new Date(msg.date)
        if(msg.from !== undefined) res.from = msg.from
        if(msg.text !== undefined) res.text = msg.text
        if(msg.primary_entity_id !== undefined) res.primary_entity_id = msg.primary_entity_id

        return res
    }


    static isSelf(msg:Message, user?: User | undefined | null){
        return msg.from === user?.id
    }
}