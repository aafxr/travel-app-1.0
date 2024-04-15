import {Expense, Limit, Photo, Travel, User} from "./store";
import {Place} from "./store/Place";

export class Compare{
    static travel(oldTravel: Travel, newTravel: Travel){
        const result: Partial<Travel> = {id: newTravel.id}

        if(oldTravel.code !== newTravel.code) result.code = newTravel.code
        if(oldTravel.description !== newTravel.description) result.description = newTravel.description
        if(oldTravel.direction !== newTravel.direction) result.direction = newTravel.direction
        if(oldTravel.owner_id !== newTravel.owner_id) result.owner_id = newTravel.owner_id
        if(oldTravel.title !== newTravel.title) result.title = newTravel.title

        if((oldTravel.previewPhotoId || newTravel.previewPhotoId) && oldTravel.previewPhotoId !== newTravel.previewPhotoId) result.previewPhotoId = newTravel.previewPhotoId

        if(oldTravel.days !== newTravel.days) result.days = newTravel.days
        if(oldTravel.isFromPoint !== newTravel.isFromPoint) result.isFromPoint = newTravel.isFromPoint
        if(oldTravel.children_count !== newTravel.children_count) result.children_count = newTravel.children_count
        if(oldTravel.members_count !== newTravel.members_count) result.members_count = newTravel.members_count

        if(oldTravel.created_at.getTime() !== newTravel.created_at.getTime()) result.created_at = new Date(newTravel.created_at)
        if(oldTravel.date_end.getTime() !== newTravel.date_end.getTime()) result.date_end = new Date(newTravel.date_end)
        if(oldTravel.date_start.getTime() !== newTravel.date_start.getTime()) result.date_start = new Date(newTravel.date_start)
        if(oldTravel.updated_at.getTime() !== newTravel.updated_at.getTime()) result.updated_at = new Date(newTravel.updated_at)

        if(oldTravel.movementTypes.length !== newTravel.movementTypes.length) result.movementTypes = newTravel.movementTypes
        else if(!oldTravel.movementTypes.every((item, idx) => newTravel.movementTypes[idx] === item)) result.movementTypes = newTravel.movementTypes

        if(oldTravel.places_id.length !== newTravel.places_id.length) result.places_id = newTravel.places_id
        else if(!oldTravel.places_id.every((item, idx) => newTravel.places_id[idx] === item)) result.places_id = newTravel.places_id

        if(oldTravel.waypoints_id.length !== newTravel.waypoints_id.length) result.waypoints_id = newTravel.waypoints_id
        else if(!oldTravel.waypoints_id.every((item, idx) => newTravel.waypoints_id[idx] === item)) result.waypoints_id = newTravel.waypoints_id

        if(oldTravel.admins.length !== newTravel.admins.length) result.admins = newTravel.admins
        else if(!oldTravel.admins.every((item, idx) => newTravel.admins[idx] === item)) result.admins = newTravel.admins

        if(oldTravel.editors.length !== newTravel.editors.length) result.editors = newTravel.editors
        else if(!oldTravel.editors.every((item, idx) => newTravel.editors[idx] === item)) result.editors = newTravel.editors

        if(oldTravel.commentator.length !== newTravel.commentator.length) result.commentator = newTravel.commentator
        else if(!oldTravel.commentator.every((item, idx) => newTravel.commentator[idx] === item)) result.commentator = newTravel.commentator

        result.preference = Object.assign({}, newTravel.preference)
        const preferencesKeys = Object.keys(oldTravel.preference) as Array<keyof Travel['preference']>
        preferencesKeys.forEach( (key )  => {
            if(result.preference && !result.preference[key]) {
                // @ts-ignore
                result.preference[key] = oldTravel.preference[key]
            }
        })

        result.permission = Object.assign({}, newTravel.permission)
        const permissionsKeys = Object.keys(oldTravel.permission) as Array<keyof Travel['permission']>
        permissionsKeys.forEach(key => {
            if(result.permission && !result.permission[key]) result.permission[key] = oldTravel.permission[key]
        })

        return result
    }

    static expense(oldExpense: Expense, newExpense: Expense){
        const result: Partial<Expense>= {
            id: newExpense.id,
            primary_entity_id: newExpense.primary_entity_id
        }

        if(oldExpense.entity_id !== newExpense.entity_id) result.entity_id = newExpense.entity_id
        if(oldExpense.entity_type !== newExpense.entity_type) result.entity_type = newExpense.entity_type
        if(oldExpense.primary_entity_type !== newExpense.primary_entity_type) result.primary_entity_type = newExpense.primary_entity_type
        if(oldExpense.section_id !== newExpense.section_id) result.section_id = newExpense.section_id
        if(oldExpense.title !== newExpense.title) result.title = newExpense.title
        if(oldExpense.user_id !== newExpense.user_id) result.user_id = newExpense.user_id
        if(oldExpense.currency !== newExpense.currency) result.currency = newExpense.currency
        if(oldExpense.created_at !== newExpense.created_at) result.created_at = newExpense.created_at
        if(oldExpense.datetime !== newExpense.datetime) result.datetime = newExpense.datetime
        if(oldExpense.personal !== newExpense.personal) result.personal = newExpense.personal
        if(oldExpense.value !== newExpense.value) result.value = newExpense.value

        return result
    }

    static limit(oldLimit: Limit, newLimit: Limit){
        const result: Partial<Limit> = {
            id: newLimit.id,
            primary_entity_id: newLimit.primary_entity_id
        }

        if(oldLimit.personal !== newLimit.personal) result.personal = newLimit.personal
        if(oldLimit.section_id !== newLimit.section_id) result.section_id = newLimit.section_id
        if(oldLimit.value !== newLimit.value) result.value = newLimit.value

        return result
    }

    static user(oldUser: User, newUser: User){
        const result: Partial<User> = { id: newUser.id }

        if(oldUser.username !== newUser.username) result.username = newUser.username
        if(oldUser.first_name !== newUser.first_name) result.first_name = newUser.first_name
        if(oldUser.last_name !== newUser.last_name) result.last_name = newUser.last_name
        if(oldUser.photo !== newUser.photo) result.photo = newUser.photo
        if(oldUser.age !== newUser.age) result.age = newUser.age

        return result
    }

    static photo(oldPhoto: Photo, newPhoto: Photo){
        const result: Partial<Photo> = {id: newPhoto.id}
        if(oldPhoto.base64 !== newPhoto.base64) result.base64 = newPhoto.base64
        return result
    }

    static place(oldPlace: Place, newPlace: Place){
        const result: Partial<Place> = {id: newPlace.id}

        if(oldPlace.name !== newPlace.name) result.name = newPlace.name
        if(oldPlace.formatted_address !== newPlace.formatted_address) result.formatted_address = newPlace.formatted_address
        if(oldPlace.photos !== newPlace.photos) result.photos = newPlace.photos
        if(oldPlace.location !== newPlace.location) result.location = newPlace.location

        if(oldPlace.day !== newPlace.day) result.day = newPlace.day
        if(oldPlace.date_start !== newPlace.date_start) result.date_start = newPlace.date_start
        if(oldPlace.date_end !== newPlace.date_end) result.date_end = newPlace.date_end

        return result
    }
}