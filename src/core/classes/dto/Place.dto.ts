import {Place} from "../store";

export class PlaceDto{
    id: string
    day?: number
    date_start?: string
    date_end?: string

    constructor(place: Partial<Place>) {
        this.id = place.id !== undefined ? place.id : ''
        if(place.day !== undefined) this.day = place.day
        if(place.date_start !== undefined) this.date_start = place.date_start.toISOString()
        if(place.date_end !== undefined) this.date_end = place.date_end.toISOString()
    }

}