import {User} from "../store";
import {Context} from "../Context";
import {UserService} from "../services";

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
}