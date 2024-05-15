"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelDto = void 0;
var HotelDto = /** @class */ (function () {
    function HotelDto(hotel) {
        this.id = hotel.id;
        if (hotel.day !== undefined)
            this.day = hotel.day;
        if (hotel.date_start !== undefined)
            this.date_start = hotel.date_start.toISOString();
        if (hotel.date_end !== undefined)
            this.date_end = hotel.date_end.toISOString();
    }
    return HotelDto;
}());
exports.HotelDto = HotelDto;
