"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialHotel = void 0;
/**
 * hotel should have id format like uniqHash:travelID:hotelIDFromApi
 * hash  в ид используется для случаев если указанный отель будет посещено несколько раз
 */
var PartialHotel = /** @class */ (function () {
    function PartialHotel(hotel) {
        if (hotel.id)
            this.id = hotel.id;
        if ('name' in hotel && hotel.name !== undefined)
            this.name = hotel.name;
        if ('photo' in hotel && hotel.photo !== undefined)
            this.photo = hotel.photo;
        if ('position' in hotel && hotel.position !== undefined)
            this.position = hotel.position;
        if ('price' in hotel && hotel.price !== undefined)
            this.price = hotel.price;
        if ('rate' in hotel && hotel.rate !== undefined)
            this.rate = hotel.rate;
        if ('tags' in hotel && hotel.tags !== undefined)
            this.tags = hotel.tags;
        if ('day' in hotel && hotel.day !== undefined)
            this.day = hotel.day;
        if ('date_start' in hotel && hotel.date_start !== undefined)
            this.date_start = new Date(hotel.date_start);
        if ('date_end' in hotel && hotel.date_end !== undefined)
            this.date_end = new Date(hotel.date_end);
    }
    return PartialHotel;
}());
exports.PartialHotel = PartialHotel;
