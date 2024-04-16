import {nanoid} from "nanoid";
import {PhotoError} from "../../errors/PhotoError";

export class Photo {
    id: string
    base64: string

    constructor(photo?: Photo) {
        if (!photo) {
            this.id = ''
            this.base64 = ''
            return
        }
        this.id = photo.id
        this.base64 = photo.base64
    }

    static fromFile(file: Blob): Promise<Photo> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onloadend = function () {
                let base64 = reader.result as string
                if (!base64) reject(PhotoError.photoLoadingFail('Не удалось прочитать файл'))
                const photo = new Photo({ id: nanoid(16), base64: base64})
                resolve(photo)
            }

            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }
}