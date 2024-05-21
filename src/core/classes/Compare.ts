import {Expense, Hotel, Limit, Photo, Travel, User, Place} from "./store";
import {compare} from "../../utils/compare";

export class Compare {
    static travel(o: Travel, n: Travel) {
        const r = compare(o, n, ['id'],["updated_at"])
        if (r) return r



        // if (o.code !== n.code) result.code = n.code
        // if (o.description !== n.description) result.description = n.description
        // if (o.direction !== n.direction) result.direction = n.direction
        // if (o.owner_id !== n.owner_id) result.owner_id = n.owner_id
        // if (o.title !== n.title) result.title = n.title
        //
        // if ((o.previewPhotoId || n.previewPhotoId) && o.previewPhotoId !== n.previewPhotoId) result.previewPhotoId = n.previewPhotoId
        //
        // if (o.days !== n.days) result.days = n.days
        // if (o.isFromPoint !== n.isFromPoint) result.isFromPoint = n.isFromPoint
        // if (o.children_count !== n.children_count) result.children_count = n.children_count
        // if (o.members_count !== n.members_count) result.members_count = n.members_count
        //
        // if (o.created_at.getTime() !== n.created_at.getTime()) result.created_at = new Date(n.created_at)
        // if (o.date_end.getTime() !== n.date_end.getTime()) result.date_end = new Date(n.date_end)
        // if (o.date_start.getTime() !== n.date_start.getTime()) result.date_start = new Date(n.date_start)
        // if (o.updated_at.getTime() !== n.updated_at.getTime()) result.updated_at = new Date(n.updated_at)
        //
        // if (o.movementTypes.length !== n.movementTypes.length) result.movementTypes = n.movementTypes
        // else if (!o.movementTypes.every((item, idx) => n.movementTypes[idx] === item)) result.movementTypes = n.movementTypes
        //
        // if (o.places_id.length !== n.places_id.length) result.places_id = n.places_id
        // else if (!o.places_id.every((item, idx) => n.places_id[idx] === item)) result.places_id = n.places_id
        //
        // if (o.waypoints_id.length !== n.waypoints_id.length) result.waypoints_id = n.waypoints_id
        // else if (!o.waypoints_id.every((item, idx) => n.waypoints_id[idx] === item)) result.waypoints_id = n.waypoints_id
        //
        // if (o.admins.length !== n.admins.length) result.admins = n.admins
        // else if (!o.admins.every((item, idx) => n.admins[idx] === item)) result.admins = n.admins
        //
        // if (o.editors.length !== n.editors.length) result.editors = n.editors
        // else if (!o.editors.every((item, idx) => n.editors[idx] === item)) result.editors = n.editors
        //
        // if (o.commentator.length !== n.commentator.length) result.commentator = n.commentator
        // else if (!o.commentator.every((item, idx) => n.commentator[idx] === item)) result.commentator = n.commentator
        //
        // result.preference = Object.assign({}, n.preference)
        // const preferencesKeys = Object.keys(o.preference) as Array<keyof Travel['preference']>
        // preferencesKeys.forEach((key) => {
        //     if (result.preference && !result.preference[key]) {
        //         // @ts-ignore
        //         result.preference[key] = o.preference[key]
        //     }
        // })
        //
        // result.permission = Object.assign({}, n.permission)
        // const permissionsKeys = Object.keys(o.permission) as Array<keyof Travel['permission']>
        // permissionsKeys.forEach(key => {
        //     if (result.permission && !result.permission[key]) result.permission[key] = o.permission[key]
        // })
        //
        // console.log(result)
        // return result
    }

    static expense(o: Expense, n: Expense) {
        // const result: Partial<Expense> = {
        //     id: n.id,
        //     primary_entity_id: n.primary_entity_id
        // }
        const r = compare(o,n ,["id", "primary_entity_id"], ["deleted"])
        if(r) return r
        //
        // if (o.entity_id !== n.entity_id) result.entity_id = n.entity_id
        // if (o.entity_type !== n.entity_type) result.entity_type = n.entity_type
        // if (o.primary_entity_type !== n.primary_entity_type) result.primary_entity_type = n.primary_entity_type
        // if (o.section_id !== n.section_id) result.section_id = n.section_id
        // if (o.title !== n.title) result.title = n.title
        // if (o.user_id !== n.user_id) result.user_id = n.user_id
        // if (o.currency !== n.currency) result.currency = n.currency
        // if (o.created_at !== n.created_at) result.created_at = n.created_at
        // if (o.datetime !== n.datetime) result.datetime = n.datetime
        // if (o.personal !== n.personal) result.personal = n.personal
        // if (o.value !== n.value) result.value = n.value
        //
        // return result
    }

    static limit(o: Limit, n: Limit) {
        // const result: Partial<Limit> = {
        //     id: n.id,
        //     primary_entity_id: n.primary_entity_id
        // }

        const r = compare(o,n ,["id", "primary_entity_id"])
        if(r) return r
        // if (o.personal !== n.personal) result.personal = n.personal
        // if (o.section_id !== n.section_id) result.section_id = n.section_id
        // if (o.value !== n.value) result.value = n.value
        //
        // return result
    }

    static user(o: User, n: User) {
        // const result: Partial<User> = {id: n.id}
        const r = compare(o,n ,["id"])
        if(r) return r
        // if (o.username !== n.username) result.username = n.username
        // if (o.first_name !== n.first_name) result.first_name = n.first_name
        // if (o.last_name !== n.last_name) result.last_name = n.last_name
        // if (o.photo !== n.photo) result.photo = n.photo
        // if (o.age !== n.age) result.age = n.age
        // return result
    }

    static photo(o: Photo, n: Photo) {
        // const result: Partial<Photo> = {id: n.id}
        const r = compare(o,n ,["id"])
        if(r) return r
        // if (o.base64 !== n.base64) result.base64 = n.base64
        // return result
    }

    static place(o: Place, n: Place) {
        // const result: Partial<Place> = {id: n.id}
        const r = compare(o,n ,["id"])
        if(r) return r
        // if (o.name !== n.name) result.name = n.name
        // if (o.formatted_address !== n.formatted_address) result.formatted_address = n.formatted_address
        // if (o.photos !== n.photos) result.photos = n.photos
        // if (o.location !== n.location) result.location = n.location
        //
        // if (o.day !== n.day) result.day = n.day
        // if (o.date_start.getTime() !== n.date_start.getTime()) result.date_start = new Date(n.date_start)
        // if (o.date_end.getTime() !== n.date_end.getTime()) result.date_end = new Date(n.date_end)
        //
        // return result
    }

    static hotel(o: Hotel, n: Hotel) {
        // const result: Partial<Hotel> = {id: n.id}
        const r = compare(o,n ,["id"])
        if(r) return r
        //
        // if (o.name !== n.name) result.name = n.name
        // if (o.photo !== n.photo) result.photo = n.photo
        // if (!o.position.every((c, idx) => c === n.position[idx])) result.position = n.position
        // if (o.price !== n.price) result.price = n.price
        // if (o.rate !== n.rate) result.rate = n.rate
        // if (!o.tags.every((el, idx) => el === n.tags[idx])) result.tags = n.tags
        //
        // if (o.day !== n.day) result.day = n.day
        // if (o.date_start.getTime() !== n.date_start.getTime()) result.date_start = new Date(n.date_start)
        // if (o.date_end.getTime() !== n.date_end.getTime()) result.date_end = new Date(n.date_end)
        //
        // return result
    }
}