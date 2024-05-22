/**
 * копирует поля из resource в target, пропускает поля, значение которых undefined
 *
 * @param target
 * @param res
 */
export function assign<T extends {}>(target: T, res: Record<string, any> ): T{
    const keys = Object.keys(res)
    for (const key of keys){
        if(res[key] === undefined) continue

        if(res[key] !== null && typeof res[key] === "object"){
            if(Array.isArray(res[key])){
                // @ts-ignore
                target[key] = res[key]
            }

            if(res[key] instanceof Date){
                // @ts-ignore
                target[key] = new Date(res[key])
            }
            // @ts-ignore
            if(!target[key]) target[key] = res[key]
            // @ts-ignore
            else assign(target[key], res[key])
            continue
        }

        // @ts-ignore
        target[key] = res[key]
    }
    return target
}