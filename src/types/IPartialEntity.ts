type TPartialEntity<T extends object> = {
    [key in keyof T]: T[key] | undefined;
};

export interface IPartialEntity<T extends TPartialEntity<T>>{}