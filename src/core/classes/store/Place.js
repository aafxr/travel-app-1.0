"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
var nanoid_1 = require("nanoid");
/**
 * place should have id format like uniqHash:travelID:placeIDFromApi
 * hash  в ид используется для случаев если указанное место будет посещено несколько раз
 */
var Place = /** @class */ (function () {
    function Place(place) {
        this.id = place.id !== undefined ? place.id : '';
        this.name = '';
        this.formatted_address = '';
        this.photos = [];
        this.location = [-1, -1];
        if ('name' in place && place.name !== undefined)
            this.name = place.name;
        if ('formatted_address' in place && place.formatted_address !== undefined)
            this.formatted_address = place.formatted_address;
        if ('photos' in place && place.photos !== undefined)
            this.photos = place.photos;
        if ('location' in place && place.location !== undefined)
            this.location = place.location;
        if ("price" in place && place.price !== undefined)
            this.price = place.price;
        if ("duration" in place && place.duration !== undefined)
            this.duration = place.duration;
        if ("popularity" in place && place.popularity !== undefined)
            this.popularity = place.popularity;
        this.day = place.day !== undefined ? place.day : 0;
        this.date_start = place.date_start !== undefined ? new Date(place.date_start) : new Date(0);
        this.date_end = place.date_end !== undefined ? new Date(place.date_end) : new Date(0);
    }
    Place.getID = function (travel, apiPlaceID) {
        return "".concat((0, nanoid_1.nanoid)(7), ":").concat(travel.id, ":").concat(apiPlaceID);
    };
    return Place;
}());
exports.Place = Place;
