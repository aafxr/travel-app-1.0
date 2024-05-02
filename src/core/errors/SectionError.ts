import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";
import {Section} from "../classes";

export class SectionError extends CustomError{
    static sectionAlreadyExist(section: Section){
        return new SectionError(`Section ${section.title} already exist`, ErrorCode.SECTION_ALREADY_EXIST)
    }
}