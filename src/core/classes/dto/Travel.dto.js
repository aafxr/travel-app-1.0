"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelDTO = void 0;
var TravelDTO = /** @class */ (function () {
    function TravelDTO(travel) {
        if (travel.id !== undefined)
            this.id = travel.id;
        if (travel.admins !== undefined)
            this.admins = travel.admins;
        if (travel.children_count !== undefined)
            this.children_count = travel.children_count;
        if (travel.code !== undefined)
            this.code = travel.code;
        if (travel.commentator !== undefined)
            this.commentator = travel.commentator;
        if (travel.created_at !== undefined)
            this.created_at = travel.created_at.toISOString();
        if (travel.date_end !== undefined)
            this.date_end = travel.date_end.toISOString();
        if (travel.date_start !== undefined)
            this.date_start = travel.date_start.toISOString();
        if (travel.updated_at !== undefined)
            this.updated_at = travel.updated_at.toISOString();
        if (travel.days !== undefined)
            this.days = travel.days;
        if (travel.description !== undefined)
            this.description = travel.description;
        if (travel.direction !== undefined)
            this.direction = travel.direction;
        if (travel.editors !== undefined)
            this.editors = travel.editors;
        if (travel.isFromPoint !== undefined)
            this.isFromPoint = travel.isFromPoint;
        if (travel.members_count !== undefined)
            this.members_count = travel.members_count;
        if (travel.movementTypes !== undefined)
            this.movementTypes = travel.movementTypes;
        if (travel.owner_id !== undefined)
            this.owner_id = travel.owner_id;
        if (travel.places_id !== undefined)
            this.places_id = travel.places_id;
        if (travel.hotels_id !== undefined)
            this.hotels_id = travel.hotels_id;
        if (travel.previewPhotoId !== undefined)
            this.previewPhotoId = travel.previewPhotoId;
        if (travel.title !== undefined)
            this.title = travel.title;
        if (travel.waypoints_id !== undefined)
            this.waypoints_id = travel.waypoints_id;
        if (travel.permission !== undefined)
            this.permission = Object.assign({}, travel.permission);
        if (travel.preference !== undefined)
            this.preference = Object.assign({}, travel.preference);
        if (travel.isPublic !== undefined)
            this.isPublic = travel.isPublic;
    }
    return TravelDTO;
}());
exports.TravelDTO = TravelDTO;
