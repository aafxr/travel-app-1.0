import {PlaceDto} from "../dto";

export class Place{
    id: string
    name: string
    formatted_address: string
    photos: string[]
    location: [number, number]

    day: number
    date_start: Date
    date_end: Date

    constructor(place: Partial<Place> | Partial<PlaceDto>) {
        this.id = place.id !== undefined ? place.id : ''

        this.name = ''
        this.formatted_address = ''
        this.photos = []
        this.location = [-1,-1]

        if('name' in place && place.name !== undefined) this.name = place.name
        if('formatted_address' in place && place.formatted_address !== undefined) this.formatted_address = place.formatted_address
        if('photos' in place && place.photos !== undefined) this.photos = place.photos
        if('location' in place && place.location !== undefined) this.location = place.location

        this.day = place.day !== undefined ? place.day : 0
        this.date_start = place.date_start !== undefined ? new Date(place.date_start) : new Date(0)
        this.date_end = place.date_end !== undefined ? new Date(place.date_end) : new Date(0)
    }
}