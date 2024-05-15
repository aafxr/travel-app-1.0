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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
var openIDBDatabaase_1 = require("./openIDBDatabaase");
var StoreName_1 = require("../../types/StoreName");
var ActionType_1 = require("../../types/ActionType");
var classes_1 = require("../classes");
/**
 * @class DB
 *
 * интерфейс для работы с indexedDB
 *
 *
 * данный интерфейс добавляет следующие статические методы:
 * - __add__                добавляет запись в стор
 * - __update__             обнавляет запись в стор
 * - __delete__             удаляет запись в стор
 * - __getOne__             возвращает 1 запись из стор или undefined
 * - __getMany__            возвращает все записи удовлетворяющие запросу из стор или []
 * - __getAll__             возвращает все записи из стор или []
 * - __getOneFromIndex__    возвращает 1 запись из стор по указанномку индексу или undefined
 * - __getManyFromIndex__   возвращает все записи по указанномку индексу удовлетворяющие запросу из стор или []
 * - __getAllFromIndex__    возвращает все записи по указанномку индексу из стор или []
 * - __getManyByIds__       возвращает все найденые записи из стор по полученному списку id из стор или []
 * - __getClosest__         возвращает ближайшую запись удовлетворяющую запросу или undefined
 * - __writeAll__           принимает массив инстансов __наследников класса StoreEntity__ и записывает все элементы в соответствующий массив
 * - __writeAllToStore__    записывает список обектов в указанный стор
 * - __openCursor__         возвращает курсор, позволяет пройтись по всем записям в бд
 * - __openIndexCursor__    возвращает курсор по указанному индексу, позволяет пройтись по всем записям в бд
 * - __getLocalActions__    метод позволяет получить список actions удовлетворяющих предикату
 *
 */
var DB = /** @class */ (function () {
    function DB() {
    }
    /**
     * добавляет запись в стор
     * @param storeName
     * @param data
     */
    DB.add = function (storeName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.add(storeName, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * обнавляет запись в стор
     * @param storeName
     * @param data
     */
    DB.update = function (storeName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(storeName, "readwrite");
                        store = tx.objectStore(storeName);
                        store.put(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * удаляет запись в стор
     * @param storeName
     * @param data
     */
    DB.delete = function (storeName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(storeName, "readwrite");
                        store = tx.objectStore(storeName);
                        store.delete(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * возвращает 1 запись из стор или undefined
     * @param storeName
     * @param id
     */
    DB.getOne = function (storeName, id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(storeName);
                        store = tx.objectStore(storeName);
                        return [4 /*yield*/, store.get(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * возвращает все записи удовлетворяющие запросу из стор или []
     * @param storeName
     * @param range
     */
    DB.getMany = function (storeName, range) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(storeName);
                        store = tx.objectStore(storeName);
                        return [4 /*yield*/, store.getAll(range)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * возвращает все записи из стор или []
     * @param storeName
     * @param count
     */
    DB.getAll = function (storeName, count) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.transaction(storeName).objectStore(storeName).getAll(undefined, count)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * возвращает 1 запись из стор по указанномку индексу или undefined
     * @param storeName
     * @param indexName
     * @param query
     */
    DB.getOneFromIndex = function (storeName, indexName, query) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(storeName);
                        store = tx.objectStore(storeName);
                        index = store.index(indexName);
                        return [4 /*yield*/, index.get(query)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * возвращает все записи по указанномку индексу удовлетворяющие запросу из стор или []
     * @param storeName
     * @param indexName
     * @param query
     * @param count
     */
    DB.getManyFromIndex = function (storeName, indexName, query, count) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(storeName);
                        store = tx.objectStore(storeName);
                        index = store.index(indexName);
                        return [4 /*yield*/, index.getAll(query, count)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * возвращает все записи по указанномку индексу из стор или []
     * @param storeName
     * @param indexName
     * @param count
     */
    DB.getAllFromIndex = function (storeName, indexName, count) {
        return __awaiter(this, void 0, void 0, function () {
            var db, tx, store, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(storeName);
                        store = tx.objectStore(storeName);
                        index = store.index(indexName);
                        return [4 /*yield*/, index.getAll(undefined, count)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * возвращает все найденые записи из стор по полученному списку id из стор или []
     * @param storeName
     * @param ids
     */
    DB.getManyByIds = function (storeName, ids) {
        return __awaiter(this, void 0, void 0, function () {
            var list, cursor, result, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ids.length)
                            return [2 /*return*/, []];
                        list = new Set(ids);
                        cursor = DB.openCursor(storeName);
                        result = [];
                        _a.label = 1;
                    case 1:
                        if (!list.size) return [3 /*break*/, 3];
                        return [4 /*yield*/, cursor.next()];
                    case 2:
                        item = (_a.sent()).value;
                        if (!item)
                            return [3 /*break*/, 3];
                        if (list.has(item.id)) {
                            list.delete(item.id);
                            result.push(item);
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * возвращает ближайшую запись удовлетворяющую запросу или undefined
     * @param storeName
     * @param query
     * @param count
     */
    DB.getClosest = function (storeName, query, count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.transaction(storeName).objectStore(storeName).getAll(query, count)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DB.writeWithAction = function (storeName, item, user_id, actionType) {
        return __awaiter(this, void 0, void 0, function () {
            var action, db, tx, itemStore, actionStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = classes_1.Action.getAction(item, user_id, storeName, actionType);
                        return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction([storeName, StoreName_1.StoreName.ACTION], 'readwrite');
                        itemStore = tx.objectStore(storeName);
                        actionStore = tx.objectStore(StoreName_1.StoreName.ACTION);
                        switch (actionType) {
                            case ActionType_1.ActionType.ADD:
                                itemStore.add(item);
                                actionStore.add(action);
                                return [2 /*return*/];
                            case ActionType_1.ActionType.UPDATE:
                                itemStore.put(item);
                                actionStore.put(action);
                                return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * записывает список обектов в указанный стор
     * @param storeName
     * @param items
     */
    DB.writeAllToStore = function (storeName, items) {
        return __awaiter(this, void 0, void 0, function () {
            var db, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!items.length)
                            return [2 /*return*/];
                        return [4 /*yield*/, (0, openIDBDatabaase_1.openIDBDatabase)()];
                    case 1:
                        db = _a.sent();
                        store = db.transaction(storeName, 'readwrite').objectStore(storeName);
                        return [4 /*yield*/, Promise.all(items.map(function (item) { return store.put(item); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * возвращает курсор, позволяет пройтись по всем записям в бд
     * @example
     *     const cursor = await DB.openCursor<ExpenseType>(StoreName.EXPENSE)
     *     let expense = (await cursor.next()).value
     *     while (expense) {
     *     //do something ....
     *     expense = (await cursor.next()).value
     *     }
     *
     * @param storeName
     * @param query
     * @param direction
     * @param predicate - callback которыый отфильтрует подходящие данные
     */
    DB.openCursor = function (storeName, query, direction, predicate) {
        return __asyncGenerator(this, arguments, function openCursor_1() {
            var db, tx, store, cursor, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __await((0, openIDBDatabaase_1.openIDBDatabase)())];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(storeName);
                        store = tx.objectStore(storeName);
                        return [4 /*yield*/, __await(store.openCursor(query, direction))];
                    case 2:
                        cursor = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!cursor) return [3 /*break*/, 11];
                        item = cursor.value;
                        if (!!predicate) return [3 /*break*/, 6];
                        return [4 /*yield*/, __await(item)];
                    case 4: return [4 /*yield*/, _a.sent()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        if (!predicate(item)) return [3 /*break*/, 9];
                        return [4 /*yield*/, __await(item)];
                    case 7: return [4 /*yield*/, _a.sent()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4 /*yield*/, __await(cursor.continue())];
                    case 10:
                        cursor = _a.sent();
                        return [3 /*break*/, 3];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * возвращает курсор по указанному индексу, позволяет пройтись по всем записям в бд
     * @example
     *     const cursor = await DB.openIndexCursor<ExpenseType>(StoreName.EXPENSE, IndexName.PRIMARY_ENTITY_ID)
     *     let expense = (await cursor.next()).value
     *     while (expense) {
     *     //do something ....
     *     expense = (await cursor.next()).value
     *     }
     * @param storeName
     * @param indexName
     * @param query
     * @param direction
     * @param predicate - callback которыый отфильтрует подходящие данные
     */
    DB.openIndexCursor = function (storeName, indexName, query, direction, predicate) {
        return __asyncGenerator(this, arguments, function openIndexCursor_1() {
            var db, index, cursor, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __await((0, openIDBDatabaase_1.openIDBDatabase)())];
                    case 1:
                        db = _a.sent();
                        index = db.transaction(storeName).objectStore(storeName).index(indexName);
                        return [4 /*yield*/, __await(index.openCursor(query, direction))];
                    case 2:
                        cursor = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!cursor) return [3 /*break*/, 11];
                        item = cursor.value;
                        if (!!predicate) return [3 /*break*/, 6];
                        return [4 /*yield*/, __await(item)];
                    case 4: return [4 /*yield*/, _a.sent()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        if (!predicate(item)) return [3 /*break*/, 9];
                        return [4 /*yield*/, __await(item)];
                    case 7: return [4 /*yield*/, _a.sent()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4 /*yield*/, __await(cursor.continue())];
                    case 10:
                        cursor = _a.sent();
                        return [3 /*break*/, 3];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * метод позволяет получить список actions удовлетворяющих предикату
     * @param predicate
     */
    DB.getLocalActions = function (predicate) {
        return __awaiter(this, void 0, void 0, function () {
            var actions, cursor, action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actions = [];
                        return [4 /*yield*/, DB.openCursor(StoreName_1.StoreName.ACTION)];
                    case 1:
                        cursor = _a.sent();
                        return [4 /*yield*/, cursor.next()];
                    case 2:
                        action = (_a.sent()).value;
                        _a.label = 3;
                    case 3:
                        if (!action) return [3 /*break*/, 5];
                        if (predicate(action)) {
                            action.datetime = new Date(action.datetime);
                            actions.push(action);
                        }
                        return [4 /*yield*/, cursor.next()];
                    case 4:
                        action = (_a.sent()).value;
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, actions];
                }
            });
        });
    };
    return DB;
}());
exports.DB = DB;
