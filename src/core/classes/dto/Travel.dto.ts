import {MovementType} from "../../../types/MovementType";
import {DBFlagType} from "../../../types/DBFlagType";
import {Preference} from "../Preference";
import {Travel} from "../store";

export class TravelDTO implements Omit<Partial<Travel>, 'created_at' | 'updated_at' | 'date_start' | 'date_end'>{
    id?: string;
    admins?: string[];
    children_count?: number;
    code?: string;
    commentator?: string[];

    created_at?: string;
    date_end?: string;
    date_start?: string;
    updated_at?: string;

    days?: number;
    description?: string;
    direction?: string;
    editors?: string[];
    isFromPoint?: DBFlagType;
    members_count?: number;
    movementTypes?: MovementType[];
    owner_id?: string;
    permission;
    places_id?: string[];
    preference?: Preference;
    previewPhotoId?: string;
    title?: string;
    waypoints_id?: string[];

    constructor(travel: Partial<Travel>) {
        if(travel.id !== undefined) this.id = travel.id
        if(travel.admins !== undefined) this.admins = travel.admins
        if(travel.children_count !== undefined) this.children_count = travel.children_count
        if(travel.code !== undefined) this.code = travel.code
        if(travel.commentator !== undefined) this.commentator = travel.commentator

        if(travel.created_at !== undefined) this.created_at = travel.created_at.toISOString()
        if(travel.date_end !== undefined) this.date_end = travel.date_end.toISOString()
        if(travel.date_start !== undefined) this.date_start = travel.date_start.toISOString()
        if(travel.updated_at !== undefined) this.updated_at = travel.updated_at.toISOString()

        if(travel.days !== undefined) this.days = travel.days
        if(travel.description !== undefined) this.description = travel.description
        if(travel.direction !== undefined) this.direction = travel.direction
        if(travel.editors !== undefined) this.editors = travel.editors
        if(travel.isFromPoint !== undefined) this.isFromPoint = travel.isFromPoint
        if(travel.members_count !== undefined) this.members_count = travel.members_count
        if(travel.movementTypes !== undefined) this.movementTypes = travel.movementTypes
        if(travel.owner_id !== undefined) this.owner_id = travel.owner_id
        if(travel.places_id !== undefined) this.places_id = travel.places_id
        if(travel.previewPhotoId !== undefined) this.previewPhotoId = travel.previewPhotoId
        if(travel.title !== undefined) this.title = travel.title
        if(travel.waypoints_id !== undefined) this.waypoints_id = travel.waypoints_id

        if(travel.permission !== undefined) this.permission = Object.assign({}, travel.permission)
        if(travel.preference !== undefined) this.preference = Object.assign({}, travel.preference)
    }

}