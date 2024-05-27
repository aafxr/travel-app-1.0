import {useMemo} from "react";
import {compare} from "../utils/compare";

export function useHasChanges<T extends {}>(o?: T , n?: T){
    return useMemo(() => !Object.keys(compare(o || {}, n || {})).length, [o,n])
}