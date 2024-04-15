import {Hotel} from "../store/Hotel";

export class HotelDto{
    id: string
    day?: number
    date_start?: string
    date_end?: string

    constructor(hotel: Partial<Hotel> & Pick<Hotel, 'id'>) {
        this.id = hotel.id

        if(hotel.day !== undefined) this.day = hotel.day
        if(hotel.date_start !== undefined) this.date_start = hotel.date_start.toISOString()
        if(hotel.date_end !== undefined) this.date_end = hotel.date_end.toISOString()
    }
}