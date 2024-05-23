import {forwardRef, HTMLAttributes, ReactNode} from "react";
import {createPortal} from "react-dom";


interface PopupPropsType extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}


export const Popup = forwardRef<HTMLDivElement, PopupPropsType>(({children, ...props}, ref)=> {
    return createPortal(
        <div ref={ref} {...props} >
            {children}
        </div>, document.body)
})