/**
 * копирует поля из resource в target, пропускает поля, значение которых undefined
 * @param target
 * @param resource
 */
export function assign<T extends {}>(target: T, resource: Record<string, any> ): T{
    const keys = Object.keys(resource).filter(k => resource[k] !== undefined)
    for (const key of keys){
        // @ts-ignore
        target[key] = resource[key]
    }
    return target
}