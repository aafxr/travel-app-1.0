import {MemberDto} from "../dto";

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
export class Member {

    id: string;
    username: string;
    first_name: string;
    last_name: string;
    photo?: string;
    age: number;


    constructor(member: Partial<Member> | MemberDto) {
        this.id = member.id ? member.id : ''
        this.username = member.username ? member.username : ''
        this.first_name = member.first_name ? member.first_name : ''
        this.last_name = member.last_name ? member.last_name : ''
        this.photo = member.photo ? member.photo : ''
        this.age = member.age ? member.age : 18
    }


    static getPartial(member: Partial<Member> | MemberDto = {}) {
        const res : Partial<Member> = {}
        if(member.id) res.id = member.id
        if(member.username) res.username = member.username
        if(member.first_name) res.first_name = member.first_name
        if(member.last_name) res.last_name = member.last_name
        if(member.photo) res.photo = member.photo
        if(member.age) res.age = member.age

        return res
    }
}