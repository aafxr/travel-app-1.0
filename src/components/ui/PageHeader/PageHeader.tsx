import React, {PropsWithChildren} from "react";
import {useNavigate} from 'react-router-dom'
import clsx from "clsx";

import {ArrowBackIcon} from "../../svg";


import './PageHeader.css'

interface PageHeaderPropsType extends PropsWithChildren{
    className?: string
    arrowBack?: boolean
    title?: string
    to?: string | Function
    MenuEl?: JSX.Element
    titleClassName?: string
}

/**
 * компонент добавляет заголовок и стрелку "вернуться назад"
 * @function
 * @param {boolean} arrowBack true добавляет стрелочку назад <=
 * @param {string} className css class
 * @param {string} titleClassName css class
 * @param {string} title заголовок
 * @param {string | function} to url на который перенаправляется пользователь при клике либо назад
 * @param {JSX.Element} children child react elements child react elements
 * @param { JSX.Element} MenuEl react element, который будет отображаться при нажатии на иконку меню компонента
 * @param props other element props
 * @category UI-Components
 * @name PageHeader
 */
export default function PageHeader({
                                       arrowBack,
                                       className,
                                       titleClassName,
                                       title,
                                       to,
                                       MenuEl,
                                       children,
                                       ...props
                                   }: PageHeaderPropsType) {
    const navigate = useNavigate()

    const rootClassName = clsx(
        'page-header-container gap-0.25',
        {
            // 'row': title,
            'flex-between': !title,
            'arrow-back': !!arrowBack,

        },
        className
    )


    function backHandler() {
        if (typeof to === 'function') {
            to()
        } else if (typeof to === 'string') {
            navigate(to)
        } else {
            navigate(-1)
        }
    }

    return (
        <div className={rootClassName} {...props}>
            <div className='page-header-icon' onClick={arrowBack ? backHandler : () => {
            }}>
                {!!arrowBack && <ArrowBackIcon/>}
            </div>
            {(!!title || children) &&
                <div className={clsx('page-header title-bold', titleClassName || 'center')}>
                    {title}
                    {children}
                </div>
            }
            <div className='page-header-icons center raw gap-0.75'>
                {MenuEl}
            </div>
        </div>
    )
}