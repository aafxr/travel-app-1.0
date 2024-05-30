import {HotelDto} from "../dto";
import {Travel} from "./Travel";
import {nanoid} from "nanoid";


/**
 * hotel should have id format like uniqHash:travelID:hotelIDFromApi
 * hash  в ид используется для случаев если указанный отель будет посещено несколько раз
 */
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

        if('id' in hotel && hotel.id !== undefined) this.id = hotel.id
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


    /**
     * метод возвращает обект на основе полученного "hotel" с допустимыми для хранения в indexeddb значениями
     * @param hotel
     */
    static getPartial(hotel: Partial<Hotel> | Partial<HotelDto> = {}) {
        const res: Partial<Hotel> = {}
        if(hotel.id) res.id = hotel.id
        if('name' in hotel && hotel.name !== undefined) res.name = hotel.name
        if('photo' in hotel && hotel.photo !== undefined) res.photo = hotel.photo
        if('position' in hotel && hotel.position !== undefined) res.position = hotel.position
        if('price' in hotel && hotel.price !== undefined) res.price = hotel.price
        if('rate' in hotel && hotel.rate !== undefined) res.rate = hotel.rate
        if('tags' in hotel && hotel.tags !== undefined) res.tags = hotel.tags

        if('day' in hotel && hotel.day !== undefined) res.day = hotel.day
        if('date_start' in hotel && hotel.date_start !== undefined) res.date_start = new Date(hotel.date_start)
        if('date_end' in hotel && hotel.date_end !== undefined) res.date_end = new Date(hotel.date_end)

        return res
    }


    /**
     * позволяет получить id отеля на основе api id
     *
     * ---
     *
     * возвращает id вида "hash:apiID"
     *
     * @param travel
     * @param apiHotelID
     */
    static getID(travel: Travel, apiHotelID: string){
        return `${nanoid(7)}:${travel.id}:${apiHotelID}`
    }
}