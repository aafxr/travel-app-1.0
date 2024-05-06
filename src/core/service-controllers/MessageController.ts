import {Context, Message} from "../classes";
import {MessageService} from "../services/MessageService";

export class MessageController {

    static async create(ctx: Context, message: Message) {
        try {
            return await MessageService.create(ctx, message)
        } catch (e) {
            throw e
        }
    }

    static async read(ctx: Context, messageID: string) {
        try {
            return await MessageService.read(ctx, messageID)
        } catch (e) {
            throw e
        }
    }

    static async readAll(ctx: Context, ...messageIDs: string[]) {
        try {
            return await MessageService.readAll(ctx, ...messageIDs)
        } catch (e) {
            throw e
        }
    }

    static async readAllByTravelID(context: Context, travelID: string) {
        try {
            return await MessageService.readAllByTravelID(context, travelID)
        } catch (e) {
            throw e
        }
    }

    static async update(ctx: Context, message: Message) {
        try {
            return await MessageService.update(ctx, message)
        } catch (e) {
            throw e
        }
    }

    static async delete(ctx: Context, message: Message) {
        try {
            return await MessageService.delete(ctx, message)
        } catch (e) {
            throw e
        }
    }

}