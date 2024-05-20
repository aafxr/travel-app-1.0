import React, {HTMLAttributes, useEffect, useRef, useState} from "react";

import defaultHandleError from "../../../utils/error-handlers/defaultHandleError";
import {Member, Photo, Travel, User} from "../../../core/classes";
import {PhotoController} from "../../../core/service-controllers";
import {useAppContext} from "../../../contexts/AppContextProvider";
import {DEFAULT_IMG_URL} from "../../../constants";


/**
 * @typedef {Object} PhotoType
 * @property {string} id - идентификатор фото
 * @property {Blob} blob - блоб файл с изобрадением
 * @property {string} src - ссылка на фото на удаленном сервере
 */


interface PhotoPropsType extends Omit<HTMLAttributes<HTMLImageElement>, 'onChange'> {
    item: Travel | User | Member,
    onChange?: (photo: Blob) => unknown
}

/**
 * компонент отображает фото по переданному src , либо ищет в бд по id
 * @param  className css class
 * @param  item        Travel | User | Member, элемент, который содержит поле "photo"
 * @param  onChange  обработчик на изменение фото
 * @param  props     other props
 * @category Components
 */
function PhotoComponent({className, item, onChange, ...props}: PhotoPropsType) {
    const ctx = useAppContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const [photo, setPhoto] = useState<Photo>()

    useEffect(() => {
        let photoID: string
        if('photo' in item && item.photo) photoID = item.photo
        else if ('previewPhotoId' in item && item.previewPhotoId) photoID = item.previewPhotoId
        else return

        PhotoController.read(ctx, photoID)
            .then(p => {
                if (p) setPhoto(p)
            })
            .catch(defaultHandleError)
    }, [])

    async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return
        const file = e.target.files[0]
        if (!file) return
            const newPhoto = await Photo.fromFile(file)
            if(photo?.id) newPhoto.id = photo.id

            PhotoController.update(ctx, newPhoto)
                .then(() => setPhoto(newPhoto))
                .then(() => onChange && onChange(file))
                .catch(defaultHandleError)
        // if (photo) {
        //
        // } else {
        //     /*** передаем обновленные данные о фото в компонент родитель */
        //     onChange && onChange(file)
        // }
    }

    return (
        <>
            <img {...props} className={className} src={photo?.base64 || DEFAULT_IMG_URL} alt="Фото"
                 onClick={() => inputRef.current?.click()}/>
            {!!onChange &&
                <input ref={inputRef} type="file" hidden onChange={handlePhotoChange} accept={'image/jpeg,image/png'}/>}
        </>
    )
}

export default React.memo(PhotoComponent)
