/**
 * копирует поля из resource в target, пропускает поля, значение которых undefined
 * @param target
 * @param res
 */
export function assign<T extends {}>(target: T, res: Record<string, any> ): T{
    const keys = Object.keys(res).filter(k => res[k] !== undefined)
    for (const key of keys){

        if(res[key] !== null && typeof res[key] === "object"){
            // @ts-ignore
            if(!target[key]) target[key] = {}
            // @ts-ignore
            assign(target[key], res[key])
            continue
        }

        // @ts-ignore
        target[key] = res[key]
    }
    return target
}