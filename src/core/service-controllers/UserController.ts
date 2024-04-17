import {User} from "../classes/store";
import {Context} from "../classes/Context";
import {PhotoService, UserService} from "../services";
import {TelegramAuthPayloadType} from "../../types/TelegramAuthPayloadType";
import {DB} from "../db/DB";
import {StoreName} from "../../types/StoreName";
import {USER_AUTH} from "../../constants";

export class UserController{
    static async create(ctx: Context, user: User){
        try {
            return await UserService.create(ctx, user)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, userID:string){
        try {
            return await UserService.read(ctx, userID)
        }catch (e){
            throw e
        }
    }

    static async update(ctx: Context, user:User){
        try {
            return await UserService.update(ctx, user)
        }catch (e){
            throw e
        }
    }

    static async delete(ctx: Context, user:User){
        try {
            return await UserService.delete(ctx, user)
        }catch (e){
            throw e
        }
    }

    static async logIn(ctx: Context, tg_authData: TelegramAuthPayloadType){
        try {
            return await UserService.logIn(ctx, tg_authData)
        } catch (e){
            throw e
        }
    }

    static async logOut(ctx: Context, user: User){
        try {
            return await UserService.logOut(ctx, user)
        } catch (e){
            throw e
        }
    }

    static async getLoggedInUser(ctx: Context) {
        try {
            return await UserService.getLoggedInUser(ctx)
        }catch (e){
            throw e
        }
    }
}