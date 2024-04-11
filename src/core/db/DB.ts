import {openIDBDatabase} from "./openIDBDatabaase";
import {StoreName} from "../../types/StoreName";
import {IndexName} from "../../types/IndexName";
import {ActionType} from "../../types/ActionType";
import {Action} from "../classes";

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
export class DB {
    /**
     * добавляет запись в стор
     * @param storeName
     * @param data
     */
    static async add<T>(storeName: StoreName, data: T) {
        const db = await openIDBDatabase()
        await db.add(storeName, data)
    }

    /**
     * обнавляет запись в стор
     * @param storeName
     * @param data
     */
    static async update<T>(storeName: StoreName, data: T) {
        const db = await openIDBDatabase()
        const tx = db.transaction(storeName, "readwrite")
        const store = tx.objectStore(storeName)
        store.put(data)
    }

    /**
     * удаляет запись в стор
     * @param storeName
     * @param data
     */
    static async delete<T extends IDBValidKey>(storeName: StoreName, data: T) {
        const db = await openIDBDatabase()
        const tx = db.transaction(storeName, "readwrite")
        const store = tx.objectStore(storeName)
        store.delete(data)
    }

    /**
     * возвращает 1 запись из стор или undefined
     * @param storeName
     * @param id
     */
    static async getOne<T>(storeName: StoreName, id: IDBValidKey): Promise<T | undefined> {
        const db = await openIDBDatabase()
        const tx = db.transaction(storeName)
        const store = tx.objectStore(storeName)
        return await store.get(id)
    }

    /**
     * возвращает все записи удовлетворяющие запросу из стор или []
     * @param storeName
     * @param range
     */
    static async getMany<T>(storeName: StoreName, range: IDBKeyRange | IDBValidKey): Promise<T[]> {
        const db = await openIDBDatabase()
        const tx = db.transaction(storeName)
        const store = tx.objectStore(storeName)
        return await store.getAll(range)
    }

    /**
     * возвращает все записи из стор или []
     * @param storeName
     * @param count
     */
    static async getAll<T>(storeName: StoreName, count?: number): Promise<T[]> {
        const db = await openIDBDatabase()
        return await db.transaction(storeName).objectStore(storeName).getAll(undefined, count)
    }

    /**
     * возвращает 1 запись из стор по указанномку индексу или undefined
     * @param storeName
     * @param indexName
     * @param query
     */
    static async getOneFromIndex<T>(storeName: StoreName, indexName: keyof T, query: IDBValidKey): Promise<T | undefined> {
        const db = await openIDBDatabase()
        const tx = db.transaction(storeName)
        const store = tx.objectStore(storeName)
        const index = store.index(indexName as string)
        return await index.get(query)
    }

    /**
     * возвращает все записи по указанномку индексу удовлетворяющие запросу из стор или []
     * @param storeName
     * @param indexName
     * @param query
     * @param count
     */
    static async getManyFromIndex<T>(storeName: StoreName, indexName: keyof T, query: IDBKeyRange | IDBValidKey, count?: number): Promise<T[]> {
        const db = await openIDBDatabase()
        const tx = db.transaction(storeName)
        const store = tx.objectStore(storeName)
        const index = store.index(indexName as string)
        return await index.getAll(query, count)
    }

    /**
     * возвращает все записи по указанномку индексу из стор или []
     * @param storeName
     * @param indexName
     * @param count
     */
    static async getAllFromIndex<T>(storeName: StoreName, indexName: keyof T, count?: number): Promise<T[]> {
        const db = await openIDBDatabase()
        const tx = db.transaction(storeName)
        const store = tx.objectStore(storeName)
        const index = store.index(indexName as string)
        return await index.getAll(undefined, count)
    }


    /**
     * возвращает все найденые записи из стор по полученному списку id из стор или []
     * @param storeName
     * @param ids
     */
    static async getManyByIds<T extends { id: string }>(storeName: StoreName, ids: string[]): Promise<T[]> {
        if (!ids.length) return []
        const list = new Set(ids)
        const cursor = DB.openCursor<T>(storeName)
        const result: T[] = []
        while (list.size) {
            const item = (await cursor.next()).value as T
            if (!item) break
            if (list.has(item.id)) {
                list.delete(item.id)
                result.push(item)
            }
        }
        return result
    }


    /**
     * возвращает ближайшую запись удовлетворяющую запросу или undefined
     * @param storeName
     * @param query
     * @param count
     */
    static async getClosest<T>(storeName: StoreName, query: IDBKeyRange, count = 1): Promise<T[]> {
        const db = await openIDBDatabase()
        return await db.transaction(storeName).objectStore(storeName).getAll(query, count)
    }


    static async writeWithAction<T extends Object>(storeName:StoreName, item: T, user_id: string, actionType:ActionType){
        const action = Action.getAction(item, user_id, storeName, actionType)
        const db = await openIDBDatabase()
        const tx = db.transaction([storeName, StoreName.ACTION], 'readwrite')
        const itemStore = tx.objectStore(storeName)
        const actionStore = tx.objectStore(StoreName.ACTION)
        switch (actionType){
            case ActionType.ADD:
                itemStore.add(item)
                actionStore.add(action)
                return
            case ActionType.UPDATE:
                itemStore.put(item)
                actionStore.put(action)
                return
        }
    }


    /**
     * записывает список обектов в указанный стор
     * @param storeName
     * @param items
     */
    static async writeAllToStore<T>(storeName: StoreName, items: T[]) {
        if (!items.length) return
        const db = await openIDBDatabase()
        const store = db.transaction(storeName, 'readwrite').objectStore(storeName)
        await Promise.all(items.map(item => store.put(item)))
    }


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
     */
    static async* openCursor<T>(storeName: StoreName, query?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection) {
        const db = await openIDBDatabase()
        const tx = db.transaction(storeName)
        const store = tx.objectStore(storeName)
        let cursor = await store.openCursor(query, direction)
        while (cursor) {
            yield cursor.value as T
            cursor = await cursor.continue()
        }
    }

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
     */
    static async* openIndexCursor<T>(storeName: StoreName,indexName: IndexName, query?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection) {
        const db = await openIDBDatabase()
        const index = db.transaction(storeName).objectStore(storeName).index(indexName)
        let cursor = await index.openCursor(query, direction)
        while (cursor) {
            yield cursor.value as T
            cursor = await cursor.continue()
        }
    }


    /**
     * метод позволяет получить список actions удовлетворяющих предикату
     * @param predicate
     */
    static async getLocalActions<T extends {}>(predicate: (action:Action<T>)=> boolean): Promise<Action<T>[]>{
        const actions: Action<T>[] = []

        const  cursor = await DB.openCursor<Action<T>>(StoreName.ACTION)
        let action = (await cursor.next()).value
        while(action){
            if(predicate(action)) {
                action.datetime = new Date(action.datetime)
                actions.push(action)
            }
            action = (await cursor.next()).value
        }
        return actions
    }
}