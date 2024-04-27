import clsx from "clsx";
import {useSwipeable} from "react-swipeable";
import React, {PropsWithChildren, useEffect, useState} from "react";

import {useOutside} from "../../../hooks";

import './Swipe.css'

let defaultMargin = 40

export type SwiperStyles = {
    leftControls?: string
    rightControls?: string
    content?: string
}

interface SwipePropsType extends PropsWithChildren {
    className?: string
    onClick?: Function
    onRemove?: Function
    onConfirm?: Function
    marginMax?: number
    small?: boolean
    leftElement?: JSX.Element
    lElemBg?: string
    rightElement?: JSX.Element
    rElemBg?: string
    multy?: boolean
    styles?: SwiperStyles
}


/**
 * Компонент позволяет обернуть дочерний компонент и добавляет возможность свайпать элемент
 * @kind component
 * @function
 * @param {React.ReactNode} children react child element
 * @param {string} [className] css class
 * @param {function} [onClick] callback, вызывается при нажатии на дочерний элемент
 * @param {function} [onRemove] callback, вызывает при клике по кнопке "удалить"
 * @param {function} [onConfirm] callback, вызывает при клике по кнопке "Подтвердить"
 * @param {number} [marginMax] default = var(--x) * 2 || 40
 * @param {boolean} [small] флаг, добавляет css class "small" (уменьшает размер шрифта)
 * @param {JSX.Element} [leftElement] компоненты, которые будут отображаться на месте иконок слева
 * @param {JSX.Element} [rightElement] компоненты, которые будут отображаться на месте иконок справа
 * @param {boolean} [multy] default = false, дает возможность свайпа нескольких элементов (по умолчанию,
 * @param  [styles] опциональный набор классов для стилезации уомпонентов свайперв (левые/правые кнопки, основная карточка)
 * при взаимодействии с другими элементами, компонент возвращается в исходное состаяние)
 * @category UI-Components
 * @name Swipe
 */
export default function Swipe({
                                  children,
                                  className,
                                  onClick,
                                  onRemove,
                                  onConfirm,
                                  marginMax,
                                  small,
                                  leftElement,
                                  rightElement,
                                  multy = false,
                                  styles
                              }: SwipePropsType) {
    const [shiftLeft, setShiftLeft] = useState(0)
    const {ref} = useOutside<HTMLDivElement>(false, setShiftLeft)//.bind(this, 0)!!!!!!!!!!!!!!!!!!!!!!!!!!!

    useEffect(() => {
        defaultMargin = parseInt(getComputedStyle(document.head).getPropertyValue('--swiper-shift')) || 40
    }, [])


    const max = (marginMax || defaultMargin)

    const handlers = useSwipeable({
        onSwiped() {
            if(shiftLeft < 0 && Math.abs(shiftLeft) > max) setShiftLeft(-max)
            else if(shiftLeft > 0 && Math.abs(shiftLeft) > max) setShiftLeft(max)
            else setShiftLeft(0)
        },
        onSwiping(e) {
            if (e.dir === 'Left') {
                rightElement && setShiftLeft(e.deltaX)
            } else if (e.dir === 'Right') {
                leftElement && setShiftLeft(e.deltaX)
            }
        },
    })


    useEffect(() => {
        function touchOutside(e: TouchEvent) {
            if (e.target instanceof Node && ref.current && !ref.current.contains(e.target)) {
                setShiftLeft(0)
            }
        }

        if (!multy && ref.current) {
            document.addEventListener('touchstart', touchOutside)
        }

        return () => document.removeEventListener('touchstart', touchOutside)
    }, [multy])


    function handleConfirm() {
        onConfirm && onConfirm()
    }

    function handleRemove() {
        setShiftLeft(0)
        onRemove && onRemove()
    }

    function handleClick(e: React.TouchEvent | React.MouseEvent) {
        if (e.eventPhase === Event.BUBBLING_PHASE) {
            e.stopPropagation()
            onClick && onClick()
        }
    }


    const mainClassName = clsx('swiper-container', {small}, className)


    return (
        <div ref={ref} className={mainClassName}>
            <div className={'swiper-controls flex-between h-full'}>
                <div className={clsx('swiper-button swiper-button-left', styles?.leftControls)} onClick={handleConfirm}>
                    {leftElement}
                </div>
                <div className={clsx('swiper-button swiper-button-right', styles?.rightControls)} onClick={handleRemove}>
                    {rightElement}
                </div>
            </div>
            <div
                className={clsx('swipe-item', styles?.content)}
                {...handlers}
                onClick={handleClick}
                style={{transform: `translateX(${shiftLeft}px)`}}
            >
                {children}
            </div>
        </div>
    )
}