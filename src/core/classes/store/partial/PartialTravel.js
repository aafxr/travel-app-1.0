"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialTravel = void 0;
/**
 * представление основной сущности путешествия
 *
 * Содержит поля:
 *
 * __id__,
 * __code__,
 * __description__,
 * __direction__,
 * __owner_id__,
 * __title__,
 * __photo__,
 * __image__,
 * __days__,
 * __isFromPoint__,
 * __children_count__,
 * __members_count__,
 * __created_at__,
 * __date_end__,
 * __date_start__,
 * __movementTypes__,
 * __updated_at__,
 * __places__,
 * __road__,
 * __waypoints__,
 * __admins__,
 * __editors__,
 * __commentator__,
 * __preference__,
 * __permission__,
 * __interests__
 */
var PartialTravel = /** @class */ (function () {
    function PartialTravel(travel) {
        if (!travel)
            travel = {};
        if (travel.id !== undefined)
            this.id = travel.id;
        if (travel.code !== undefined)
            this.code = travel.code;
        if (travel.description !== undefined)
            this.description = travel.description;
        if (travel.direction !== undefined)
            this.direction = travel.direction;
        if (travel.owner_id !== undefined)
            this.owner_id = travel.owner_id;
        if (travel.title !== undefined)
            this.title = travel.title;
        if (travel.previewPhotoId)
            this.previewPhotoId = travel.previewPhotoId;
        if (travel.days !== undefined)
            this.days = travel.days;
        if (travel.isFromPoint !== undefined)
            this.isFromPoint = travel.isFromPoint;
        if (travel.children_count !== undefined)
            this.children_count = travel.children_count;
        if (travel.members_count !== undefined)
            this.members_count = travel.members_count;
        if (travel.created_at !== undefined)
            this.created_at = new Date(travel.created_at);
        if (travel.date_end !== undefined)
            this.date_end = new Date(travel.date_end);
        if (travel.date_start !== undefined)
            this.date_start = new Date(travel.date_start);
        if (travel.updated_at !== undefined)
            this.updated_at = new Date(travel.updated_at);
        if (travel.movementTypes !== undefined && Array.isArray(travel.movementTypes))
            this.movementTypes = __spreadArray([], travel.movementTypes, true);
        if (travel.places_id !== undefined && Array.isArray(travel.places_id))
            this.places_id = __spreadArray([], travel.places_id, true);
        if (travel.hotels_id !== undefined && Array.isArray(travel.hotels_id))
            this.hotels_id = __spreadArray([], travel.hotels_id, true);
        if (travel.waypoints_id !== undefined && Array.isArray(travel.waypoints_id))
            this.waypoints_id = __spreadArray([], travel.waypoints_id, true);
        if (travel.preference !== undefined)
            this.preference = __assign({}, travel.preference);
        if (travel.permission !== undefined)
            this.permission = __assign({}, travel.permission);
        if (travel.admins !== undefined && Array.isArray(travel.admins))
            this.admins = __spreadArray([], travel.admins, true);
        if (travel.editors !== undefined && Array.isArray(travel.editors))
            this.editors = __spreadArray([], travel.editors, true);
        if (travel.commentator !== undefined && Array.isArray(travel.commentator))
            this.commentator = __spreadArray([], travel.commentator, true);
    }
    return PartialTravel;
}());
exports.PartialTravel = PartialTravel;
