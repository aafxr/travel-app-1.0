"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * класс позволяет уведомлять передавать подписчикам данные
 *
 *
 * - метод __subscribe__ позволяет подписаться на событие и получать актуальные данные.
 * Метод возвращает callback __unsubscribe__, который позволяет отисаться от события.
 * unsubscribe должен вызываться при уничтожение компонента (подписчика)
 *
 *
 * - метод __emit__ позволяет генерировать событие, которое будет вызывать всех подписчиков
 */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = new Map();
        this.upd = -1;
    }
    /**
     * @method
     * @name EventEmitter.subscribe
     * @param {string} eventName
     * @param {Function} callback
     * @return {() => unknown}
     */
    EventEmitter.prototype.subscribe = function (eventName, callback) {
        var _this = this;
        if (!this.events.has(eventName))
            this.events.set(eventName, []);
        this.events.get(eventName).push(callback);
        return function () {
            if (_this.events.has(eventName)) {
                var callbacks = _this.events.get(eventName).filter(function (cb) { return cb !== callback; });
                _this.events.set(eventName, callbacks);
            }
        };
    };
    /**
     * @method
     * @name EventEmitter.emit
     * @param {string} eventName
     * @param that
     */
    EventEmitter.prototype.emit = function (eventName, that) {
        var callbacks = this.events.get(eventName);
        if (callbacks)
            callbacks.forEach(function (cb) { return cb(that[0]); });
    };
    return EventEmitter;
}());
exports.default = EventEmitter;
