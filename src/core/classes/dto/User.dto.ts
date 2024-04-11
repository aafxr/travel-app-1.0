import {MemberDto} from "./Member.dto";
import {User} from "../store";

export class UserDto extends MemberDto{
    constructor(user: Partial<User>) {
        super(user);
    }
}