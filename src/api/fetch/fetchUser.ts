import aFetch from "../../axios";
import {APIUserType} from "../../types/APIUserType";

export  async function  fetchUser(id: string){
    try{
        const user: APIUserType | undefined = (await aFetch.post('/users/', {data: id})).data
        return user
    }catch (e){
    }
}