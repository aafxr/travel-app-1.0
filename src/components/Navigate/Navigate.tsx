import React from "react";
import {useNavigate} from "react-router-dom";

type NavigatePropsType = {
    to: string
    children?: React.ReactNode
    beforeNavigate?: () => unknown
    className?: string
}

/**
 * компонент при клике выполняет навигацию на указанный в пропсе to path
 * @param to - navigation path
 * @param children - any children
 * @param beforeNavigate - cb call before navigate (use to make some changes)
 * @param className - add custom style
 * @constructor
 */
export function Navigate({to, children, beforeNavigate, className}: NavigatePropsType){
    const navigate = useNavigate()


    function handleClickNavigate(){
        beforeNavigate?.()
        navigate(to)
    }


    return (
        <div className={className} onClick={handleClickNavigate}>
            {children}
        </div>
    )
}