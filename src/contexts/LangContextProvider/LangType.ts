export type LangType = {
    RUS: 'RUS - Русский'
}

export type LangKeyType = keyof LangType
export type LangValueType = LangType[LangKeyType]

