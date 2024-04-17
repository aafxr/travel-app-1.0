import {nanoid} from "nanoid";


import {MovementType} from "../../../../types/MovementType";
import {DBFlagType} from "../../../../types/DBFlagType";
import {TravelPermission} from "../../TravelPermission";
import {Preference} from "../../Preference";
import {TravelDTO} from "../../dto";
import {Travel} from "../Travel";

/**
 * представление основной сущности путешествия
 *
 * Содержит поля:
 *
 * __id__,
 * __code__,
 * __description__,
 * __direction__,
 * __owner_id__,
 * __title__,
 * __photo__,
 * __image__,
 * __days__,
 * __isFromPoint__,
 * __children_count__,
 * __members_count__,
 * __created_at__,
 * __date_end__,
 * __date_start__,
 * __movementTypes__,
 * __updated_at__,
 * __places__,
 * __road__,
 * __waypoints__,
 * __admins__,
 * __editors__,
 * __commentator__,
 * __preference__,
 * __permission__,
 * __interests__
 */
export class PartialTravel implements Partial<Travel>{

    id?: string;
    code?: string;
    description?: string;
    direction?: string;
    owner_id?: string;
    title?: string;

    previewPhotoId?: string;

    days?: number
    isFromPoint?: DBFlagType
    children_count?: number
    members_count?: number

    created_at?: Date;
    date_end?: Date;
    date_start?: Date;
    updated_at?: Date;

    movementTypes?: MovementType[];
    places_id?: string[];
    hotels_id?: string[];
    waypoints_id?: string[];

    admins?: string[];
    editors?: string[];
    commentator?: string[];

    preference?: Preference;
    permission?: TravelPermission;

    constructor(travel?: Partial<Travel> | TravelDTO) {
        if(!travel) travel = {}

        if(travel.id !== undefined) this.id = travel.id
        if(travel.code !== undefined) this.code = travel.code
        if(travel.description !== undefined) this.description = travel.description
        if(travel.direction !== undefined) this.direction = travel.direction
        if(travel.owner_id !== undefined) this.owner_id = travel.owner_id
        if(travel.title !== undefined) this.title = travel.title

        if(travel.previewPhotoId) this.previewPhotoId = travel.previewPhotoId

        if(travel.days !== undefined) this.days = travel.days
        if(travel.isFromPoint !== undefined) this.isFromPoint = travel.isFromPoint
        if(travel.children_count !== undefined) this.children_count = travel.children_count
        if(travel.members_count !== undefined) this.members_count = travel.members_count

        if(travel.created_at !== undefined) this.created_at = new Date(travel.created_at)
        if(travel.date_end !== undefined) this.date_end = new Date(travel.date_end)
        if(travel.date_start !== undefined) this.date_start = new Date(travel.date_start)
        if(travel.updated_at !== undefined) this.updated_at = new Date(travel.updated_at)

        if(travel.movementTypes !== undefined && Array.isArray(travel.movementTypes)) this.movementTypes = [...travel.movementTypes]
        if(travel.places_id !== undefined && Array.isArray(travel.places_id)) this.places_id = [...travel.places_id]
        if(travel.hotels_id !== undefined && Array.isArray(travel.hotels_id)) this.hotels_id = [...travel.hotels_id]
        if(travel.waypoints_id !== undefined && Array.isArray(travel.waypoints_id)) this.waypoints_id = [...travel.waypoints_id]

        if(travel.preference !== undefined) this.preference = {...travel.preference}
        if(travel.permission !== undefined) this.permission = {...travel.permission}

        if(travel.admins !== undefined && Array.isArray(travel.admins)) this.admins = [...travel.admins]
        if(travel.editors !== undefined && Array.isArray(travel.editors)) this.editors = [...travel.editors]
        if(travel.commentator !== undefined && Array.isArray(travel.commentator)) this.commentator = [...travel.commentator]
    }
}