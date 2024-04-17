import clsx from "clsx";
import {useEffect, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {PhotoController} from "../../core/service-controllers";
import {DEFAULT_IMG_URL} from "../../constants";
import {Photo as PhotoEntity} from "../../core/classes";

import './Photo.css'



interface IPhoto{
    className?: string
    id?: string
    onClick?: (id:string) => unknown
}

export function Photo({
                          className,
                          id,
                          onClick
                      }: IPhoto){
    const ctx = useAppContext()
    const [photo, setPhoto] = useState<PhotoEntity>()

    useEffect(() => {
        if (!id) return
        if(photo && photo.id === id ) return

        PhotoController.read(ctx, id)
            .then(setPhoto)
            .catch(defaultHandleError)
    }, [id])

    function handleClick(){
        if(!onClick || !id) return
        onClick(id)
    }

    return (
        <div
            className={clsx('avatar', className)}
            onClick={handleClick}
        >
            <img src={photo ? photo.base64 : DEFAULT_IMG_URL} alt={`${id}`} />
        </div>
    )
}