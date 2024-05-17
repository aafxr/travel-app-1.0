import {Hotel} from "../store";

export class HotelDto{
    id: string
    name?: string
    photo?: string
    position?: [number,number]
    price?: number
    rate?: number
    tags?:any[]

    day?: number
    date_start?: string
    date_end?: string

    constructor(hotel: Partial<Hotel> & Pick<Hotel, 'id'>) {
        this.id = hotel.id

        if(hotel.day !== undefined) this.day = hotel.day
        if(hotel.date_start !== undefined) this.date_start = hotel.date_start.toISOString()
        if(hotel.date_end !== undefined) this.date_end = hotel.date_end.toISOString()

        if(hotel.name) this.name = hotel.name
        if(hotel.photo) this.photo = hotel.photo
        if(hotel.position) this.position = hotel.position
        if(hotel.price) this.price = hotel.price
        if(hotel.rate) this.rate = hotel.rate
        if(hotel.tags) this.tags = hotel.tags
    }
}