import React, {ReactNode} from "react";
import clsx from "clsx";

import './ListItem.css'

type ListItemPropsType = {
    className?: string
    topDescription?: string
    icon?: JSX.Element
    children: ReactNode
    time?:Date
}

/**
 * Компонент предназначен для отображения элемента списка (используется на странице с последними действиями)
 * @param {string} className css class
 * @param {string} topDescription заголовок компонента
 * @param {string} time время , отобрадается в правом верхнем углу
 * @param {JSX.Element} children child react elements дочерние компонеты, помещаются под заголовком
 * @param {JSX.Element} icon иконка в формате jsx
 * @returns {JSX.Element}
 * @category Components
 */
export default function ListItem({className, topDescription = '', time, children, icon}: ListItemPropsType){
    return (
        <div className={clsx('list-item flex-between', className)}>
            <div className='column'>
                <div className='list-item-description'>{topDescription}</div>
                <div className='list-item-title'>{children}</div>
            </div>
            <div className='column'>
                <div className='list-item-time'>{time?.toLocaleString() || ''}</div>
                {!!icon && <span className='list-item-icon'>{icon}</span>}
            </div>
        </div>
    )
}