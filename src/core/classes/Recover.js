"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recover = void 0;
var DB_1 = require("../db/DB");
var StoreName_1 = require("../../types/StoreName");
var IndexName_1 = require("../../types/IndexName");
var store_1 = require("./store");
var ActionType_1 = require("../../types/ActionType");
var Recover = /** @class */ (function () {
    function Recover() {
    }
    Recover.travel = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, predicate, cursor, travelAction, t, keys, _i, keys_1, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = new store_1.Travel({ id: id });
                        predicate = function (item) { return item.entity === StoreName_1.StoreName.TRAVEL && item.data.id === id; };
                        cursor = DB_1.DB.openIndexCursor(StoreName_1.StoreName.ACTION, IndexName_1.IndexName.DATETIME, undefined, "next", predicate);
                        return [4 /*yield*/, cursor.next()];
                    case 1:
                        travelAction = (_a.sent()).value;
                        _a.label = 2;
                    case 2:
                        if (!travelAction) return [3 /*break*/, 4];
                        if (travelAction.action === ActionType_1.ActionType.DELETE)
                            return [2 /*return*/];
                        return [4 /*yield*/, cursor.next()];
                    case 3:
                        travelAction = (_a.sent()).value;
                        if (travelAction) {
                            t = new store_1.Travel(travelAction.data);
                            keys = Object.keys(t);
                            for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                                key = keys_1[_i];
                                if (typeof t[key] === 'object')
                                    Object.assign(result[key], t[key]);
                                else {
                                    // @ts-ignore
                                    result[key] = t[key];
                                }
                            }
                        }
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    Recover.expense = function (id, entityType) {
        return __awaiter(this, void 0, void 0, function () {
            var result, predicate, cursor, expenseAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = new store_1.Expense({ id: id, variant: entityType });
                        predicate = function (item) { return item.entity === entityType && item.data.id === id; };
                        return [4 /*yield*/, DB_1.DB.openIndexCursor(StoreName_1.StoreName.ACTION, IndexName_1.IndexName.DATETIME, undefined, "next", predicate)];
                    case 1:
                        cursor = _a.sent();
                        return [4 /*yield*/, cursor.next()];
                    case 2:
                        expenseAction = (_a.sent()).value;
                        _a.label = 3;
                    case 3:
                        if (!expenseAction) return [3 /*break*/, 5];
                        if (expenseAction.action === ActionType_1.ActionType.DELETE)
                            return [2 /*return*/];
                        return [4 /*yield*/, cursor.next()];
                    case 4:
                        expenseAction = (_a.sent()).value;
                        if (expenseAction)
                            Object.assign(result, expenseAction.data);
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    Recover.limit = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, predicate, cursor, limitAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = new store_1.Limit({ id: id });
                        predicate = function (item) { return item.entity === StoreName_1.StoreName.LIMIT && item.data.id === id; };
                        return [4 /*yield*/, DB_1.DB.openIndexCursor(StoreName_1.StoreName.ACTION, IndexName_1.IndexName.DATETIME, undefined, "next", predicate)];
                    case 1:
                        cursor = _a.sent();
                        return [4 /*yield*/, cursor.next()];
                    case 2:
                        limitAction = (_a.sent()).value;
                        _a.label = 3;
                    case 3:
                        if (!limitAction) return [3 /*break*/, 5];
                        if (limitAction.action === ActionType_1.ActionType.DELETE)
                            return [2 /*return*/];
                        return [4 /*yield*/, cursor.next()];
                    case 4:
                        limitAction = (_a.sent()).value;
                        if (limitAction)
                            Object.assign(result, limitAction.data);
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    Recover.place = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, predicate, cursor, placeAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = new store_1.Place({ id: id });
                        predicate = function (item) { return item.entity === StoreName_1.StoreName.PLACE && item.data.id === id; };
                        return [4 /*yield*/, DB_1.DB.openIndexCursor(StoreName_1.StoreName.ACTION, IndexName_1.IndexName.DATETIME, undefined, "next", predicate)];
                    case 1:
                        cursor = _a.sent();
                        return [4 /*yield*/, cursor.next()];
                    case 2:
                        placeAction = (_a.sent()).value;
                        _a.label = 3;
                    case 3:
                        if (!placeAction) return [3 /*break*/, 5];
                        if (placeAction.action === ActionType_1.ActionType.DELETE)
                            return [2 /*return*/];
                        return [4 /*yield*/, cursor.next()];
                    case 4:
                        placeAction = (_a.sent()).value;
                        if (placeAction)
                            Object.assign(result, placeAction.data);
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    Recover.hotel = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, predicate, cursor, hotelAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = new store_1.Hotel({ id: id });
                        predicate = function (item) { return item.entity === StoreName_1.StoreName.HOTELS && item.data.id === id; };
                        return [4 /*yield*/, DB_1.DB.openIndexCursor(StoreName_1.StoreName.ACTION, IndexName_1.IndexName.DATETIME, undefined, "next", predicate)];
                    case 1:
                        cursor = _a.sent();
                        return [4 /*yield*/, cursor.next()];
                    case 2:
                        hotelAction = (_a.sent()).value;
                        _a.label = 3;
                    case 3:
                        if (!hotelAction) return [3 /*break*/, 5];
                        if (hotelAction.action === ActionType_1.ActionType.DELETE)
                            return [2 /*return*/];
                        return [4 /*yield*/, cursor.next()];
                    case 4:
                        hotelAction = (_a.sent()).value;
                        if (hotelAction)
                            Object.assign(result, hotelAction.data);
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    Recover.photo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, predicate, cursor, photoAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = new store_1.Photo({ id: id, base64: '' });
                        predicate = function (item) { return item.entity === StoreName_1.StoreName.Photo && item.data.id === id; };
                        return [4 /*yield*/, DB_1.DB.openIndexCursor(StoreName_1.StoreName.ACTION, IndexName_1.IndexName.DATETIME, undefined, "next", predicate)];
                    case 1:
                        cursor = _a.sent();
                        return [4 /*yield*/, cursor.next()];
                    case 2:
                        photoAction = (_a.sent()).value;
                        _a.label = 3;
                    case 3:
                        if (!photoAction) return [3 /*break*/, 5];
                        if (photoAction.action === ActionType_1.ActionType.DELETE)
                            return [2 /*return*/];
                        return [4 /*yield*/, cursor.next()];
                    case 4:
                        photoAction = (_a.sent()).value;
                        if (photoAction)
                            Object.assign(result, photoAction.data);
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    return Recover;
}());
exports.Recover = Recover;
