import clsx from "clsx";
import {PropsWithChildren, ReactNode, useState} from "react";
import {useNavigate} from "react-router-dom";

import defaultHandleError from "../../../utils/error-handlers/defaultHandleError";
import {useAppContext, useUser} from "../../../contexts/AppContextProvider";
import {UserController} from "../../../core/service-controllers";
import MenuIconList from "../../MenuIconList/MenuIconList";
import {useOutside} from "../../../hooks";
import {ChevronRightIcon, MenuIcon} from "../../svg";

import './Menu.css'

type MenuPropsType = {
    children?: ReactNode,
    className?: string
}

/**
 * Компонент для отображения меню
 * @param children
 * @param className
 * @category Components
 */
function Menu({children, className}: MenuPropsType) {
    const user = useUser()
    const ctx = useAppContext()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const {ref} = useOutside<HTMLDivElement>(false, setIsOpen)

    function handleLogin() {
        if (user) {
            UserController.logOut(ctx, user)
                .then(() => ctx.setUser())
                .then(() => navigate('/'))
                .catch(defaultHandleError)
        } else {
            navigate('/login/')
        }
    }

    return (
        <div ref={ref} className={clsx('menu', {'open': isOpen}, className)}>
            <div className='menu-dots' onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon/>
            </div>
            <div className='menu-container column gap-0.5'>
                <div className='menu-icons row flex-nowrap gap-1 pb-20'>
                    <MenuIconList/>
                </div>
                {children}
                <div className='menu-item title-semi-bold' onClick={handleLogin}>
                    {user ? 'Выйти' : 'Войти'}
                </div>
            </div>
        </div>
    )
}


export interface MenuITemPropsType extends PropsWithChildren, Partial<Pick<HTMLDivElement, 'onclick'>>{
    arrow?: boolean
    className?: string
}

function Item({arrow, children, className,...rest}: MenuITemPropsType){
    return (
        <div {...rest} className={clsx('menu-item', className)} >
            {children}
            {arrow && <ChevronRightIcon className='menu-item-icon icon' /> }
        </div>
    )

}

export default Object.assign(Menu, {Item})