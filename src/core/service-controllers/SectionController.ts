import {SectionService} from "../services/SectionService";
import {CustomError} from "../errors/CustomError";
import {ErrorCode} from "../errors/ErrorCode";
import {Context, Section} from "../classes";

export class SectionController{


    static async create(ctx: Context, section: Section){
        try {
            return await SectionService.create(ctx, section)
        }catch (e){
            if(e instanceof CustomError && e.code === ErrorCode.SECTION_ALREADY_EXIST)
                return section
        }
    }


    static async update(ctx: Context, section: Section){
        try {
            return await SectionService.update(ctx, section)
        }catch (e){
            throw e
        }
    }


    static async read(ctx: Context, sectionID: string){
        try {
            return await SectionService.read(ctx, sectionID)
        }catch (e){
            throw e
        }
    }


    static async readAll(ctx: Context){
        try {
            return await SectionService.readAll(ctx)
        }catch (e){
            throw e
        }
    }


    static async init(ctx: Context){
        try {
            return SectionService.init(ctx)
        }catch (e){
            throw e
        }
    }
}