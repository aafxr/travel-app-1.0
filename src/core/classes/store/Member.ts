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
    photo?: Record<string, any>;
    age: number;


    constructor(member: Partial<Member> | MemberDto) {
        this.id = member.id ? member.id : ''
        this.username = member.username ? member.username : ''
        this.first_name = member.first_name ? member.first_name : ''
        this.last_name = member.last_name ? member.last_name : ''
        this.photo = member.photo ? member.photo : {}
        this.age = member.age ? member.age : 18
    }
}