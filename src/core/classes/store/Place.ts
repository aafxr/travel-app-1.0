import {PlaceDto} from "../dto";
import {Travel} from "./Travel";
import {nanoid} from "nanoid";


/**
 * place should have id format like uniqHash:travelID:placeIDFromApi
 * hash  в ид используется для случаев если указанное место будет посещено несколько раз
 */
export class Place{
    id: string
    name: string
    formatted_address: string
    photos: string[]
    location: [number, number]

    price?: number
    duration?: number
    popularity?: number

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

        if("price" in place && place.price !== undefined) this.price = place.price
        if("duration" in place && place.duration !== undefined) this.duration = place.duration
        if("popularity" in place && place.popularity !== undefined) this.popularity = place.popularity

        this.day = place.day !== undefined ? place.day : 0
        this.date_start = place.date_start !== undefined ? new Date(place.date_start) : new Date(0)
        this.date_end = place.date_end !== undefined ? new Date(place.date_end) : new Date(0)
    }


    /**
     * метод возвращает обект на основе полученного "place" с допустимыми для хранения в indexeddb значениями
     * @param place
     */
    static getPartial(place: Partial<Place> | Partial<PlaceDto> = {}) {
        const res: Partial<Place> = {}
        if(place.id) res.id = place.id
        if('name' in place && place.name !== undefined) res.name = place.name
        if('formatted_address' in place && place.formatted_address !== undefined) res.formatted_address = place.formatted_address
        if('photos' in place && place.photos !== undefined) res.photos = place.photos
        if('location' in place && place.location !== undefined) res.location = place.location

        if(place.day !== undefined) res.day = place.day
        if(place.date_start !== undefined) res.date_start = new Date(place.date_start)
        if(place.date_end !== undefined) res.date_end = new Date(place.date_end)

        if('price' in place) res.price = place.price
        if('duration' in place) res.duration = place.duration
        if('popularity' in place) res.popularity = place.popularity
        return res
    }


    /**
     * позволяет получить id локации на основе api id
     *
     * ---
     *
     * возвращает id вида "hash:apiID"
     *
     * @param travel
     * @param apiPlaceID
     */
    static getID(travel: Travel, apiPlaceID: string){
        return `${nanoid(7)}:${travel.id}:${apiPlaceID}`
    }
}