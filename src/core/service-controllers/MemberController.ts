import {Member} from "../classes/store";
import {Context} from "../classes/Context";
import {MemberService} from "../services";

export class MemberController{
    static async create(ctx: Context, member: Member){
        try {
            return await MemberService.create(ctx, member)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, memberID:string){
        try {
            return await MemberService.read(ctx, memberID)
        }catch (e){
            throw e
        }
    }

    static async readAll(ctx: Context, ...memberIDs:string[]){
        try {
            return await MemberService.readAll(ctx, ...memberIDs)
        }catch (e){
            throw e
        }
    }

    static async update(ctx: Context, member:Member){
        try {
            return await MemberService.update(ctx, member)
        }catch (e){
            throw e
        }
    }

    static async delete(ctx: Context, member:Member){
        try {
            return await MemberService.delete(ctx, member)
        }catch (e){
            throw e
        }
    }
}