export type LangType = {
    rus: '(rus) Русский'
    en: '(en) English'
}

export type LangKeyType = keyof LangType
export type LangValueType = LangType[LangKeyType]

