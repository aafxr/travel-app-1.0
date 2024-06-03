import {Expense, Hotel, Limit, Photo, Travel, User, Place} from "./store";
import {compare} from "../../utils/compare";

export class Compare {
    static travel(o: Travel, n: Travel) {
        const r = compare(o, n, ['id'], ["updated_at"])
        if (r) return r
    }

    static expense(o: Expense, n: Expense) {
        const r = compare(o, n, ["id", "primary_entity_id"], ["deleted"])
        if (r) return r
    }

    static limit(o: Limit, n: Limit) {
        const r = compare(o, n, ["id", "primary_entity_id"])
        if (r) return r
    }

    static user(o: User, n: User) {
        const r = compare(o, n, ["id"], ["token", 'refresh_token'])
        if (r) return r
    }

    static photo(o: Photo, n: Photo) {
        const r = compare(o, n, ["id"])
        if (r) return r
    }

    static place(o: Place, n: Place) {
        const r = compare(o, n, ["id"])
        if (r) return r
    }

    static hotel(o: Hotel, n: Hotel) {
        const r = compare(o, n, ["id"])
        if (r) return r
    }
}
