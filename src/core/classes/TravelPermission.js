"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPermission = void 0;
var TravelPermission = /** @class */ (function () {
    function TravelPermission(permissions) {
        if (!permissions) {
            this.public = 0;
            this.showCheckList = 0;
            this.showComments = 0;
            this.showExpenses = 0;
            this.showRoute = 0;
            return;
        }
        this.public = permissions.public !== undefined ? permissions.public : 0;
        this.showCheckList = permissions.showCheckList !== undefined ? permissions.showCheckList : 0;
        this.showComments = permissions.showComments !== undefined ? permissions.showComments : 0;
        this.showExpenses = permissions.showExpenses !== undefined ? permissions.showExpenses : 0;
        this.showRoute = permissions.showRoute !== undefined ? permissions.showRoute : 0;
    }
    return TravelPermission;
}());
exports.TravelPermission = TravelPermission;
