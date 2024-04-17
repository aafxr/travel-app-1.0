import {Member} from "../Member";
import {MemberDto} from "../../dto";

/**
 * представление пользователя приложения
 *
 * Содержит поля:
 *
 * __id__,
 * __username__,
 * __first_name__,
 * __last_name__,
 * __photo__,
 * __movementType__,
 * __age__,
 */
export class PartialMember implements Partial<Member> {

    id?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    photo?: string;
    age?: number;


    constructor(member: Partial<Member> | MemberDto) {
        if(member.id) this.id = member.id
        if(member.username) this.username = member.username
        if(member.first_name) this.first_name = member.first_name
        if(member.last_name) this.last_name = member.last_name
        if(member.photo) this.photo = member.photo
        if(member.age) this.age = member.age
    }
}