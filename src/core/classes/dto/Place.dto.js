"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceDto = void 0;
var PlaceDto = /** @class */ (function () {
    function PlaceDto(place) {
        this.id = place.id !== undefined ? place.id : '';
        if (place.day !== undefined)
            this.day = place.day;
        if (place.date_start !== undefined)
            this.date_start = place.date_start.toISOString();
        if (place.date_end !== undefined)
            this.date_end = place.date_end.toISOString();
    }
    return PlaceDto;
}());
exports.PlaceDto = PlaceDto;
