import {nanoid} from "nanoid";

import {MovementType} from "../../../types/MovementType";
import {TravelPermission} from "../TravelPermission";
import {DBFlagType} from "../../../types/DBFlagType";
import {Preference} from "../Preference";
import {TravelDTO} from "../dto";
import {MS_IN_DAY} from "../../../constants";
import {MemberRole} from "../../../types/MemberRole";
import {Member} from "./Member";

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
    hotels_id: string[];
    waypoints_id: string[];

    admins: string[];
    editors: string[];
    commentator: string[];

    preference: Preference;
    permission: TravelPermission;

    isPublic: DBFlagType

    constructor(travel?: Partial<Travel> | TravelDTO) {
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
        this.hotels_id      = travel.hotels_id !== undefined ? [...travel.hotels_id] : []
        this.waypoints_id   = travel.waypoints_id !== undefined ? [...travel.waypoints_id] : []

        this.preference     = travel.preference !== undefined ? Object.assign({}, travel.preference) : new Preference()
        this.permission     = travel.permission !== undefined ? Object.assign({}, travel.permission) : new TravelPermission()

        this.admins         = travel.admins !== undefined ? [...travel.admins] : []
        this.editors        = travel.editors !== undefined ? [...travel.editors] : []
        this.commentator    = travel.commentator !== undefined ? [...travel.commentator] : []

        this.isPublic       = travel.isPublic !== undefined ? travel.isPublic : 0
    }

    static setDateStart(travel: Travel, start: Date){
        if(start.getSeconds() || start.getMinutes() || start.getMilliseconds() || start.getHours()) start.setHours(0,0,0,0)
        travel.date_start = new Date(start)
        travel.date_end = new Date(travel.date_start.getTime() + MS_IN_DAY * travel.days)
    }

    static setDateEnd(travel: Travel, end: Date){
        if(end.getHours() !== 23 || end.getMilliseconds() !== 999) end.setHours(23,59,59,999)
        travel.date_end = new Date(end)
        travel.date_start = new Date(travel.date_end.getTime() - MS_IN_DAY * travel.days)
    }

    static setDays(travel: Travel, days: number){
        if (days < 1) return
        travel.date_end = new Date(travel.date_start.getTime() + MS_IN_DAY * days)
        travel.days = days
    }

    static getInterest(travel: Travel, key: keyof Preference['interests']) {
        if (key in travel.preference.interests)
            return travel.preference.interests[key]
        else
            return 0
    }

    static getPreference<T extends keyof Preference>(travel: Travel, key: T) {
        return travel.preference[key]
    }

    static getMembers(travel: Travel) {
        return [travel.owner_id, ...travel.admins, ...travel.editors, ...travel.commentator]
    }

    static getMemberRole(travel: Travel, memberID: string): MemberRole{
        if(travel.owner_id === memberID) return MemberRole.OWNER
        if(travel.admins.includes(memberID)) return MemberRole.ADMIN
        if(travel.editors.includes(memberID)) return MemberRole.EDITOR
        if(travel.commentator.includes(memberID)) return MemberRole.COMMENTATOR
        return MemberRole.WATCHER
    }

    static isMemberInTravel(t: Travel, m: Member){
        const list = Travel.getMembers(t)
        return list.includes(m.id)
    }

    static addMember(t: Travel, m: Member, role: MemberRole = MemberRole.COMMENTATOR){
        const isInTravel = Travel.isMemberInTravel(t,m)
        if (isInTravel) return
        switch (role){
            case MemberRole.EDITOR:
                t.editors.push(m.id)
                break
            case MemberRole.WATCHER:
                t.commentator.push(m.id)
                break
            case MemberRole.COMMENTATOR:
                t.commentator.push(m.id)
                break
            default:
        }
        return t
    }
}