import {nanoid} from "nanoid";

import {MovementType} from "../../../types/MovementType";
import {TravelPermission} from "../TravelPermission";
import {DBFlagType} from "../../../types/DBFlagType";
import {Preference} from "../Preference";

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
export class Travel {

    id: string;
    code: string;
    description: string;
    direction: string;
    owner_id: string;
    title: string;

    previewPhotoId?: string;

    days: number
    isFromPoint: DBFlagType
    children_count: number
    members_count: number

    created_at: Date;
    date_end: Date;
    date_start: Date;
    updated_at: Date;

    movementTypes: MovementType[];
    places_id: string[];
    waypoints_id: string[];

    admins: string[];
    editors: string[];
    commentator: string[];

    preference: Preference;
    permission: TravelPermission;

    constructor(travel?: Partial<Travel>) {
        if(!travel) travel = {}

        this.id             = travel.id !== undefined ? travel.id : nanoid(7)
        this.code           = travel.code !== undefined ? travel.code : ''
        this.description    = travel.description !== undefined ? travel.description : ''
        this.direction      = travel.direction !== undefined ? travel.direction : ''
        this.owner_id       = travel.owner_id !== undefined ? travel.owner_id : ''
        this.title          = travel.title !== undefined ? travel.title : ''

        if(travel.previewPhotoId) this.previewPhotoId = travel.previewPhotoId

        this.days           = travel.days !== undefined ? travel.days : 1
        this.isFromPoint    = travel.isFromPoint !== undefined ? travel.isFromPoint : 0
        this.children_count = travel.children_count !== undefined ? travel.children_count : 0
        this.members_count  = travel.members_count !== undefined ? travel.members_count : 1

        this.created_at     = travel.created_at !== undefined ? new Date(travel.created_at) : new Date()
        this.date_end       = travel.date_end !== undefined ? new Date(travel.date_end) : new Date(0)
        this.date_start     = travel.date_start !== undefined ? new Date(travel.date_start) : new Date(0)
        this.updated_at     = travel.updated_at !== undefined ? new Date(travel.updated_at) : new Date()

        this.movementTypes  = travel.movementTypes !== undefined ? [...travel.movementTypes] : [ MovementType.CAR ]
        this.places_id      = travel.places_id !== undefined ? [...travel.places_id] : []
        this.waypoints_id   = travel.waypoints_id !== undefined ? [...travel.waypoints_id] : []

        this.preference     = travel.preference !== undefined ? Object.assign({}, travel.preference) : new Preference()
        this.permission     = travel.permission !== undefined ? Object.assign({}, travel.permission) : new TravelPermission()

        this.admins         = travel.admins !== undefined ? [...travel.admins] : []
        this.editors        = travel.editors !== undefined ? [...travel.editors] : []
        this.commentator    = travel.commentator !== undefined ? [...travel.commentator] : []
    }
}