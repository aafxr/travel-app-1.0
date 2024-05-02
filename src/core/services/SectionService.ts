import {SectionError} from "../errors/SectionError";
import {StoreName} from "../../types/StoreName";
import {fetchSections} from "../../api/fetch";
import {Context, Section} from "../classes";
import {DB} from "../db/DB";

export class SectionService{


    static async create(ctx: Context, section: Section){
        try {
            await DB.add(StoreName.SECTION, section)
            return section
        } catch (e){
            throw SectionError.sectionAlreadyExist(section)
        }
    }


    static async update(ctx: Context, section: Section){
        await DB.update(StoreName.SECTION, section)
        return section
    }


    static async read(ctx: Context, sectionID: string){
        const section = await DB.getOne<Section>(StoreName.SECTION, sectionID)
        return section ? new Section(section) : undefined
    }


    static async readAll(ctx: Context){
        const sections = await DB.getAll<Section>(StoreName.SECTION)
        return sections.map(s => new Section(s))
    }


    static async init(ctx: Context){
        const sections = await fetchSections()
        for (const section of sections){
            await SectionService.update(ctx, section)
        }
        return sections
    }
}