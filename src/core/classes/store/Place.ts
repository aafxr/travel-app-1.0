import {PlaceDto} from "../dto/PlaceDto";

export class Place{
    id: string
    name: string
    formatted_address: string
    photos: string[]
    location: [number, number]

    day: number
    date_start: Date
    date_end: Date

    constructor(place: Partial<Place> & Partial<PlaceDto>) {
        this.id = place.id !== undefined ? place.id : ''
        this.name = place.name !== undefined ? place.name : ''
        this.formatted_address = place.formatted_address !== undefined ? place.formatted_address : ''
        this.photos = place.photos !== undefined ? place.photos : []
        this.location = place.location !== undefined ? place.location : [-1 , -1]

        this.day = place.day !== undefined ? place.day : 0
        this.date_start = place.date_start !== undefined ? new Date(place.date_start) : new Date(0)
        this.date_end = place.date_end !== undefined ? new Date(place.date_end) : new Date(0)
    }
}