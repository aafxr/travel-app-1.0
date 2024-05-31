import {LangService} from "../services";

export class LangController {
    static async getLangList(){
        try {
            return await LangService.getLangList()
        }catch (e){
            throw e
        }
    }
}