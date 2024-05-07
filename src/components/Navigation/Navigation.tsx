import clsx from "clsx";
import {NavLink, useParams} from "react-router-dom";

import {CompassIcon, EventsIcon, HeartIcon, HomeIcon, UserIcon} from "../svg";

import './Navigation.css'
import {TRAVEL_TYPE} from "../../constants";


type NavigationPropsType = {
    className?: string
}

/**
 * Компонент отображает кнопки навигации снизу экрана
 * @param className
 * @category Components
 */
export default function Navigation({className}: NavigationPropsType) {
    const {travelType} = useParams()
    const navLinkClassName = ({ isActive, isPending }: {isActive: boolean, isPending: boolean} ) => isPending ? "pending" : isActive ? "active" : ""

    return (
        <div className={clsx('navigation', className)}>
            <div className='navigation-content flex-stretch'>
                <div className='navigation-item center'>
                    <NavLink to={'/'} className={navLinkClassName} >
                        <div className='columnt'>
                            <div className='navigation-icon'><HomeIcon/></div>
                            <div className='navigation-title'>Главная</div>
                        </div>
                    </NavLink>
                </div>
                <div className='navigation-item center'>
                    <NavLink to={'/events/'} className={navLinkClassName}>
                        <div className='navigation-icon'><EventsIcon/></div>
                        <div className='navigation-title'>События</div>
                    </NavLink>
                </div>
                <div className='navigation-item center'>
                    <NavLink to={`/travels/${localStorage.getItem(TRAVEL_TYPE) || travelType || 'current'}/`} className={navLinkClassName}>
                        <div className='navigation-icon'><CompassIcon/></div>
                        <div className='navigation-title'>Маршруты</div>
                    </NavLink>
                </div>
                <div className='navigation-item center'>
                    <NavLink to={'/favorite/'} className={navLinkClassName}>
                        <div className='navigation-icon'><HeartIcon/></div>
                        <div className='navigation-title'>Избранное</div>
                    </NavLink>
                </div>
                <div className='navigation-item center'>
                    <NavLink to={'/profile/'} className={navLinkClassName}>
                        <div className='navigation-icon'><UserIcon/></div>
                        <div className='navigation-title'>Профиль</div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}