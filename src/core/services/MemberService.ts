import {Context} from "../classes/Context";
import {Member} from "../classes/store";
import {DB} from "../db/DB";
import {StoreName} from "../../types/StoreName";

export class MemberService{
    static async create(ctx: Context, member: Member){
        return await DB.add(StoreName.USERS, member)
    }

    static async read(ctx: Context, memberID:string){
        const member = await DB.getOne<Member>(StoreName.USERS, memberID)
        if(member) return new Member(member)
    }

    static async readAll(ctx: Context, ...memberIDs:string[]){
        const req = memberIDs.map(id => DB.getOne<Member>(StoreName.USERS, id))
        const members = await Promise.all(req)
        return members.filter(m => !!m).map(m => new Member(m!))
    }

    static async update(ctx: Context, member:Member){
        await DB.update(StoreName.USERS, member)
        return  member
    }

    static async delete(ctx: Context, member:Member){
        await DB.delete(StoreName.USERS, member.id)
        return member
    }
}