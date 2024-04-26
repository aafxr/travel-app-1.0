import clsx from "clsx";

import {DEFAULT_IMG_URL} from "../../constants";

import './Image.css'

export type ImagePropsType = {
    className?: string
    src?: string
    alt?: string
}

export function Image({className, src, alt}: ImagePropsType) {
    return (
        <div className={clsx('Image', className)}>
            <img className='img-abs' src={src || DEFAULT_IMG_URL} alt={alt || ''}/>
        </div>
    )
}