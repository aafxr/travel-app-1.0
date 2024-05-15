"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preference = void 0;
var Preference = /** @class */ (function () {
    function Preference(pref) {
        if (!pref) {
            this.density = 2;
            this.depth = 2;
            this.interests = {};
            Object.assign(this.interests, Preference.base_interests);
            return;
        }
        this.density = pref.density !== undefined ? pref.density : 2;
        this.depth = pref.depth !== undefined ? pref.depth : 2;
        this.interests = {};
        Object.assign(this.interests, Preference.base_interests);
        if (pref.interests)
            Object.assign(this.interests, pref.interests);
    }
    Preference.base_density = 2;
    Preference.base_depth = 2;
    Preference.base_duration = 45 * 60 * 1000;
    Preference.base_interests = {
        history: 0,
        nature: 0,
        party: 0,
        active: 0,
        child: 0,
    };
    return Preference;
}());
exports.Preference = Preference;
