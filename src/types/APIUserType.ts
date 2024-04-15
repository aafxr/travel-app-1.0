import {User} from "../core/classes";

export type APIUserType = Pick<User, 'id' | 'username' | 'first_name' | 'last_name' | 'photo'>