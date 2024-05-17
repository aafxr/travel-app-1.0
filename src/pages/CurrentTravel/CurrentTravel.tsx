import {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {DEFAULT_ROUTE_FILTER, ROUTE_FILTER, TRAVEL_TYPE} from "../../constants";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useTravel} from "../../contexts/AppContextProvider";
import {TravelController} from "../../core/service-controllers";
import {useHotels, useMembers, usePlaces} from "../../hooks/redux-hooks";
import Container from "../../components/Container/Container";
import {RouteFilterType} from "../../types/RouteFilterType";
import Curtain from "../../components/ui/Curtain/Curtain";
import {MembersList} from "../../components/MembersList";
import dateRange from "../../utils/date-utils/dateRange";
import Button from "../../components/ui/Button/Button";
import {Chip, PageHeader} from "../../components/ui";
import Loader from "../../components/Loader/Loader";
import Menu from "../../components/ui/Menu/Menu";
import {Image} from "../../components/Image";
import {RouteByDay} from "./RouteByDay";
import {RouteOnMap} from "./RouteOnMap";
import {AllPlaces} from "./AllPlaces";
import {
    CalendarIcon, ChatIcon,
    ChecklistIcon,
    FlagIcon,
    MapIcon,
    MoneyIcon,
    VisibilityIcon,
} from "../../components/svg";

import './CurrentTravel.css'
import clsx from "clsx";


export function CurrentTravel() {
    const context = useAppContext()
    const {travelCode, travelDay} = useParams()
    const navigate = useNavigate()

    const travel = useTravel()
    const {members, loading: membersLoading} = useMembers()
    const {places, loading: placesLoading} = usePlaces()
    const {hotels} = useHotels()
    const [routeFilter, setRouteFilter] = useState<RouteFilterType>(localStorage.getItem(ROUTE_FILTER) as RouteFilterType || DEFAULT_ROUTE_FILTER)
    const [cOpen, setCOpen] = useState(false);


    const filteredPlaces = useMemo(() => {
        const day = Number(travelDay) || 1
        return [...places, ...hotels].filter(p => p.day === day)
    }, [places, hotels, travelDay])


    useEffect(() => {
        if (!travel) return
        if (!travelDay) navigate(`/travel/${travel.id}/1/`)
    }, [])


    useEffect(() => {
        if (!travelCode) navigate('/')
        else {
            TravelController.read(context, travelCode)
                .then(t => t && context.setTravel(t))
                .catch(defaultHandleError)
        }
    }, [])


    function handleRouteFilterChange(type: RouteFilterType) {
        localStorage.setItem(ROUTE_FILTER, type)
        setRouteFilter(type)
    }


    return (
        <>
            <div className='current-travel wrapper'>
                <PageHeader
                    to={`/travels/${localStorage.getItem(TRAVEL_TYPE) || 'current'}/`}
                    className={clsx('current-travel-header transparent',{copen:!cOpen})}
                    arrowBack
                    titleClassName='flex-end'
                    MenuEl={
                        <Menu>
                            <Menu.Item arrow>asd</Menu.Item>
                        </Menu>
                    }
                >
                    {/*<div className='current-travel-icons'>*/}
                    {/*    <span className='current-travel-icon'><CopyIcon className='icon'/></span>*/}
                    {/*    <span className='current-travel-icon'><LinkIcon className='icon'/></span>*/}
                    {/*    <span className='current-travel-icon'><BellIcon className='icon'/></span>*/}
                    {/*</div>*/}
                </PageHeader>
                <Container className='current-travel-content content'>
                    <Image className='current-travel-image' src={travel?.previewPhotoId} alt={travel?.title}/>
                    <div className='current-travel-title'>
                        {travel?.title}
                        &nbsp;
                        <VisibilityIcon className='icon'/>
                    </div>
                    {!!travel?.description && <div className='current-travel-subtitle'>{travel?.description}</div>}
                    {!!travel &&
                        <div className='current-travel-duration'>
                            <Chip color={"orange"} rounded>
                                {dateRange(travel.date_start || '', travel.date_end || '')}
                            </Chip>
                        </div>
                    }

                    <div className='current-travel-members'>
                        {membersLoading
                            ? <div><Loader/></div>
                            : <MembersList members={members}/>
                        }
                    </div>
                </Container>

                <Container className='footer'>
                    <div className='current-travel-btns'>
                        <button
                            className='rounded-button'
                            onClick={() => navigate(`/travel/${travel?.id}/expenses/`)}
                        >
                            <MoneyIcon className='icon'/>
                            &nbsp;
                            Расходы
                        </button>
                        <button className='rounded-button'>
                            <ChecklistIcon className='icon'/>
                            &nbsp;
                            Чек-лист
                        </button>
                        <button className='rounded-button'>
                            <ChatIcon className='icon'/>
                        </button>
                    </div>
                </Container>
            </div>
            <Curtain onChange={setCOpen}>
                <div className='wrapper relative'>
                    <Container>
                        <div className='route-filter-list pt-20'>
                            <Button
                                className='route-filter-btn'
                                onClick={() => handleRouteFilterChange("byDays")}
                                active={routeFilter === "byDays"}>
                                <CalendarIcon className='icon'/>
                                по дням
                            </Button>
                            <Button
                                className='route-filter-btn'
                                onClick={() => handleRouteFilterChange("onMap")}
                                active={routeFilter === "onMap"}>
                                <MapIcon className='icon'/>
                                на карте
                            </Button>
                            <Button
                                className='route-filter-btn'
                                onClick={() => handleRouteFilterChange("allPlaces")}
                                active={routeFilter === 'allPlaces'}>
                                <FlagIcon className='icon'/>
                                все места
                            </Button>
                        </div>
                    </Container>
                    {routeFilter === 'byDays' &&
                        <RouteByDay places={filteredPlaces} placesLoading={placesLoading} travel={travel}/>}
                    {routeFilter === 'onMap' && <RouteOnMap places={filteredPlaces}/>}
                    {routeFilter === 'allPlaces' && <AllPlaces places={places}/>}
                    {/*<Navigation className='footer'/>*/}
                </div>
            </Curtain>
        </>
    )
}




