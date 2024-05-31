export type LangType = {
    RUS: '(rus) Русский'
}

export type LangKeyType = keyof LangType
export type LangValueType = LangType[LangKeyType]

