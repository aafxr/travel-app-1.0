import {LogErrorType} from "../../utils/error-handlers/defaultHandleError";
import {StoreName} from "../../types/StoreName";
import {Context} from "../classes";
import {DB} from "../db/DB";

export class ErrorService{
    static async read(ctx: Context, date: Date, count: number = 20, offset: number = 0){
        const res: LogErrorType[] = []
        const cursor = DB.openCursor<LogErrorType>(StoreName.ERRORS, IDBKeyRange.upperBound(date), "prev")
        let e = (await cursor.next()).value
        let skip = 0
        while (e && res.length < count){
            if(skip < offset){
                skip++
                e = (await cursor.next()).value
                continue
            }
            res.push(e)
            e = (await cursor.next()).value
        }
        return res
    }
}