import {Place} from "../store";

export class PlaceDto{
    id: string
    day?: number
    date_start?: string
    date_end?: string

    name?: string
    formatted_address?: string
    photos?: string[]
    location?:[number, number]
    price?: number
    duration?: number
    popularity?: number

    constructor(place: Partial<Place>) {
        this.id = place.id !== undefined ? place.id : ''
        if(place.day !== undefined) this.day = place.day
        if(place.date_start !== undefined) this.date_start = place.date_start.toISOString()
        if(place.date_end !== undefined) this.date_end = place.date_end.toISOString()

        if(place.name) this.name = place.name
        if(place.formatted_address) this.formatted_address = place.formatted_address
        if(place.photos) this.photos = place.photos
        if(place.location) this.location = place.location
        if(place.price) this.price = place.price
        if(place.duration) this.duration = place.duration
        if(place.popularity) this.popularity = place.popularity
    }

}