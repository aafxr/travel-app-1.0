import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import { TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useTravel} from "../../contexts/AppContextProvider";
import Navigation from "../../components/Navigation/Navigation";
import Container from "../../components/Container/Container";
import Curtain from "../../components/ui/Curtain/Curtain";
import {Chip, PageHeader} from "../../components/ui";
import {MembersList} from "../../components/MembersList";
import dateRange from "../../utils/date-utils/dateRange";
import Button from "../../components/ui/Button/Button";
import Loader from "../../components/Loader/Loader";
import {useMembers, _usePlaces} from "../../hooks";
import {Image} from "../../components/Image";
import {
    CalendarIcon, ChatIcon,
    ChecklistIcon,
    FlagIcon,
    MapIcon,
    MenuIcon, MoneyIcon,
    VisibilityIcon,
} from "../../components/svg";

import './CurrentTravel.css'
import {RouteByDay} from "./RouteByDay";
import {RouteFilterType} from "../../types/RouteFilterType";
import {DEFAULT_ROUTE_FILTER, ROUTE_FILTER, TRAVEL_TYPE} from "../../constants";
import {RouteOnMap} from "./RouteOnMap";
import {AllPlaces} from "./AllPlaces";

export function CurrentTravel() {
    const context = useAppContext()
    const {travelCode, travelDay} = useParams()
    const navigate = useNavigate()

    const travel = useTravel()
    const {members, membersLoading} = useMembers()
    const {places, placesLoading} = _usePlaces(Number(travelDay) || 1)
    const [routeFilter, setRouteFilter] = useState<RouteFilterType>(localStorage.getItem(ROUTE_FILTER) as RouteFilterType || DEFAULT_ROUTE_FILTER)


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


    function handleRouteFilterChange(type: RouteFilterType){
        localStorage.setItem(ROUTE_FILTER, type)
        setRouteFilter(type)
    }


    return (
        <>
            <div className='current-travel wrapper'>
                <PageHeader
                    to={`/travels/${localStorage.getItem(TRAVEL_TYPE) || 'current'}/`}
                    className='current-travel-header transparent'
                    arrowBack
                    titleClassName='flex-end'
                    MenuEl={<div><MenuIcon/></div>}
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
            <Curtain>
                <div className='wrapper'>
                    <Container>
                        <div className='route-filter-list'>
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
                    {routeFilter === 'byDays' && <RouteByDay places={places} placesLoading={placesLoading} travel={travel}/>}
                    {routeFilter === 'onMap' && <RouteOnMap places={places} /> }
                    {routeFilter === 'allPlaces' && <AllPlaces places={places} /> }
                    {/*<Navigation className='footer'/>*/}
                </div>
            </Curtain>
        </>
    )
}




