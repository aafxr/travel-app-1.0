export function compare<T extends {}>(o: T, n:T, include: Array<keyof T> = [],  skip: Array<keyof T> = []){
    const ink = new Set(include)
    const s = new Set(skip)
    const res: Partial<T> = {}
    let hasChange = false
    const keys = Object.keys(n) as Array<keyof T>
    for(const k of keys){
        if(ink.has(k)){
            res[k] = n[k] || o[k]
            continue
        }

        if(s.has(k)) continue

        if(n[k] === undefined) continue

        if(o[k] === undefined){
            res[k] = n[k]
            hasChange = true
            continue
        }

        // @ts-ignore
        if(n[k] instanceof Date && o[k]?.getTime() !== n[k].getTime()) {
            // @ts-ignore
            res[k] = new Date(n[k])
            hasChange = true
            continue
        }

        if(Array.isArray(n[k])){
            const isArrayEqual = (o[k] as Array<any>).every((el,i) => el === (o[k] as Array<any>)[i])
            if(!isArrayEqual) {
                res[k] = n[k]
                hasChange = true
            }
            // // @ts-ignore
            // const r = compare(o[k], n[k])
            // if(r){
            //     // @ts-ignore
            //     res[k] = Object.values(r)
            //     hasChange = true
            // }
            continue
        }

        if(n[k] && typeof n[k] === 'object'){
           // @ts-ignore
            const r = compare(o[k], n[k])
            if(r) {
                // @ts-ignore
                res[k] = r
                hasChange = true
            }
            continue
        }

        if(o[k] !== n[k]) {
            res[k] = n[k]
            hasChange = true
        }
    }
    return hasChange ? res : hasChange
}


export type CompareFuncType = typeof compare