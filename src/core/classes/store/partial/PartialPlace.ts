import {PlaceDto} from "../../dto";
import {Place} from "../Place";


/**
 * place should have id format like uniqHash:travelID:placeIDFromApi
 * hash  в ид используется для случаев если указанное место будет посещено несколько раз
 */
export class PartialPlace implements Partial<Place>{
    id?: string
    name?: string
    formatted_address?: string
    photos?: string[]
    location?: [number, number]

    day?: number
    date_start?: Date
    date_end?: Date

    constructor(place: Partial<Place> | Partial<PlaceDto>) {
        if(place.id) this.id = place.id
        if('name' in place && place.name !== undefined) this.name = place.name
        if('formatted_address' in place && place.formatted_address !== undefined) this.formatted_address = place.formatted_address
        if('photos' in place && place.photos !== undefined) this.photos = place.photos
        if('location' in place && place.location !== undefined) this.location = place.location

        this.day = place.day !== undefined ? place.day : 0
        this.date_start = place.date_start !== undefined ? new Date(place.date_start) : new Date(0)
        this.date_end = place.date_end !== undefined ? new Date(place.date_end) : new Date(0)
    }
}