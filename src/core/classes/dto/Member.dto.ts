import {Member} from "../store";

export class MemberDto implements Partial<Member>{
    id?: string;
    age?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo?: Record<string, any>;

    constructor(member: Partial<Member>) {
        if(member.id) this.id = member.id
        if(member.age) this.age = member.age
        if(member.first_name) this.first_name = member.first_name
        if(member.last_name) this.last_name = member.last_name
        if(member.username) this.username = member.username
        if(member.photo) this.photo = member.photo
    }
}