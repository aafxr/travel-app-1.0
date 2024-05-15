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
exports.openIDBDatabase = void 0;
var db_constants_1 = require("./db-constants");
// import {pushAlertMessage} from "../../components/Alerts/Alerts";
var idb_1 = require("idb");
/**
 * метод открывает соединение с indexeddb и при необходимости делает upgrade бд
 * @param dbname
 * @param version
 * @param stores список представляет описание стор (ключи и список индексов )
 */
function openIDBDatabase(dbname, version, stores) {
    if (dbname === void 0) { dbname = db_constants_1.DB_NAME; }
    if (version === void 0) { version = db_constants_1.DB_VERSION; }
    if (stores === void 0) { stores = db_constants_1.DB_STORES; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, idb_1.openDB)(dbname, version, {
                        upgrade: function (db, oldVersion, newVersion, transaction, event) {
                            // Array.from(db.objectStoreNames).forEach(storeName => db.deleteObjectStore(storeName))
                            var existedStores = Array.from(db.objectStoreNames);
                            var storeNameList = stores.map(function (store) { return store.name; });
                            console.log(existedStores);
                            console.log(storeNameList);
                            /*** удаление существующих store из indexeddb если их нет в списке storeInfo (т.е. нет в схеме бд) */
                            existedStores
                                .filter(function (store) { return !storeNameList.includes(store); })
                                .forEach(function (store) { return db.deleteObjectStore(store); });
                            stores.forEach(function (storeInfo) {
                                /*** проверяем существует ли в бд таблица с именем storeInfo.name */
                                if (!db.objectStoreNames.contains(storeInfo.name)) {
                                    var store_1 = db.createObjectStore(storeInfo.name, { keyPath: storeInfo.key, });
                                    storeInfo.indexes.forEach(function (indexName) {
                                        store_1.createIndex(indexName, indexName, {});
                                    });
                                    /*** если store существует обновляем индексы для этого store */
                                }
                                else {
                                    var store_2 = transaction.objectStore(storeInfo.name);
                                    var indexs_1 = store_2.indexNames;
                                    var newIndexes_1 = storeInfo.indexes.map(function (index) { return '' + index; });
                                    newIndexes_1.forEach(function (index) {
                                        if (!indexs_1.contains(index))
                                            store_2.createIndex(index, index, {});
                                    });
                                    Array
                                        .from(indexs_1)
                                        .filter(function (index) { return !newIndexes_1.includes(index); })
                                        .forEach(function (index) { return store_2.deleteIndex(index); });
                                }
                            });
                        },
                        blocked: function (currentVersion, blockedVersion, event) {
                            // …
                            // pushAlertMessage({
                            //     type: 'danger',
                            //     message: `[DB blocked] currentVersion: ${currentVersion}, blockedVersion${blockedVersion}`
                            // })
                            console.warn(event);
                        },
                        blocking: function (currentVersion, blockedVersion, event) {
                            // …
                            // pushAlertMessage({
                            //     type: 'danger',
                            //     message: `[DB blocking] currentVersion: ${currentVersion}, blockedVersion${blockedVersion}`
                            // })
                        },
                        terminated: function () {
                            // …
                            // pushAlertMessage({type: 'danger', message: `[DB terminated]`})
                        },
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.openIDBDatabase = openIDBDatabase;
