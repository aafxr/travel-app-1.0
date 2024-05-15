"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var Context = /** @class */ (function () {
    function Context(context) {
        if (!context)
            return;
        if (context.user)
            this.user = context.user;
        if (context.travel)
            this.travel = context.travel;
        if (context.socket)
            this.socket = context.socket;
    }
    Context.prototype.setUser = function (user) {
        this.user = user;
    };
    Context.prototype.setTravel = function (travel) {
        this.travel = travel;
    };
    Context.prototype.setSocket = function (socket) {
        this.socket = socket;
    };
    Object.defineProperty(Context.prototype, "isLogIn", {
        get: function () {
            return !!(this.user && Boolean(this.user.token) && Boolean(this.user.refresh_token));
        },
        enumerable: false,
        configurable: true
    });
    return Context;
}());
exports.Context = Context;
