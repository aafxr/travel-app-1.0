import {Photo} from "../store";

export class PhotoDto{
    id: string
    base64: string

    constructor(photo: Photo) {
        this.id = photo.id
        this.base64 = photo.base64
    }
}