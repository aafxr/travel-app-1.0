import {Context} from "../classes";
import {ErrorService} from "../services";

export class ErrorController{
    static async read(ctx: Context, date: Date, count: number = 20, offset?: number){
        try {
            return await ErrorService.read(ctx, date, count, offset)
        }catch (e){
            throw e
        }
    }
}