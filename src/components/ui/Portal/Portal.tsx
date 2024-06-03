import React, {PropsWithChildren} from "react";
import {createPortal} from "react-dom";

interface PortalPropsType extends PropsWithChildren {
    container?: Element
}


export function Portal({
                           children,
                           container = document.body
                       }: PortalPropsType) {


    return createPortal(
        <>
            {children}
        </>, container)

}