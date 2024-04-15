import {HotelDto} from "../dto/Hotel.dto";

export class Hotel{
    id: string
    name: string
    photo: string
    position: [number,number]
    price: number
    rate: number
    tags:any[]
    
    day: number
    date_start: Date
    date_end: Date
    
    constructor(hotel: Partial<Hotel> | Partial<HotelDto>) {
        this.id = ''
        this.name = ''
        this.photo = ''
        this.position = [-1,-1]
        this.price = 0
        this.rate = 0
        this.tags = []

        this.day = 0
        this.date_start = new Date(0)
        this.date_end = new Date(0)

        if('name' in hotel && hotel.name !== undefined) this.name = hotel.name
        if('photo' in hotel && hotel.photo !== undefined) this.photo = hotel.photo
        if('position' in hotel && hotel.position !== undefined) this.position = hotel.position
        if('price' in hotel && hotel.price !== undefined) this.price = hotel.price
        if('rate' in hotel && hotel.rate !== undefined) this.rate = hotel.rate
        if('tags' in hotel && hotel.tags !== undefined) this.tags = hotel.tags

        if('day' in hotel && hotel.day !== undefined) this.day = hotel.day
        if('date_start' in hotel && hotel.date_start !== undefined) this.date_start = new Date(hotel.date_start)
        if('date_end' in hotel && hotel.date_end !== undefined) this.date_end = new Date(hotel.date_end)
    }
}