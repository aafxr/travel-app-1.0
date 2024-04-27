import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {HotelController, PlaceController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useTravel} from "../../contexts/AppContextProvider";
import {PlaceCard} from "../../components/PlaceCard/PlaceCard";
import {HotelCard} from "../../components/HotelCard/HotelCard";
import Container from "../../components/Container/Container";
import Curtain from "../../components/ui/Curtain/Curtain";
import {Chip, PageHeader, Tab} from "../../components/ui";
import {MembersList} from "../../components/MembersList";
import dateRange from "../../utils/date-utils/dateRange";
import Button from "../../components/ui/Button/Button";
import Swipe from "../../components/ui/Swipe/Swipe";
import Loader from "../../components/Loader/Loader";
import {useMembers} from "../../hooks/useMembers";
import {usePlaces} from "../../hooks/usePlaces";
import {Hotel, Place, Travel} from "../../core/classes";
import {Image} from "../../components/Image";
import {
    CalendarIcon, ChatIcon,
    ChecklistIcon,
    FlagIcon,
    MapIcon,
    MenuIcon, MoneyIcon, TrashIcon,
    VisibilityIcon,
} from "../../components/svg";

import './CurrentTravel.css'
import Navigation from "../../components/Navigation/Navigation";

export function CurrentTravel() {
    const context = useAppContext()
    const {travelCode, travelDay} = useParams()
    const navigate = useNavigate()

    const travel = useTravel()
    const {members, membersLoading} = useMembers()
    const {places, placesLoading} = usePlaces(Number(travelDay) || 1)


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


    return (
        <>
            <div className='current-travel wrapper'>
                <PageHeader className='current-travel-header transparent' arrowBack titleClassName='flex-end'
                            MenuEl={<div><MenuIcon/></div>}>
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
                        <button className='rounded-button'>
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
                            <Button className='route-filter-btn'>
                                <CalendarIcon className='icon'/>
                                по дням
                            </Button>
                            <Button className='route-filter-btn' active={false}>
                                <MapIcon className='icon'/>
                                на карте
                            </Button>
                            <Button className='route-filter-btn' active={false}>
                                <FlagIcon className='icon'/>
                                все места
                            </Button>
                        </div>
                    </Container>
                    <RouteByDay places={places} placesLoading={placesLoading} travel={travel}/>
                    <Navigation className='footer'/>
                </div>
            </Curtain>
        </>
    )
}


type RouteByDayPropsType = {
    travel?: Travel | null,
    places: Array<Place | Hotel>,
    placesLoading: boolean
}


function RouteByDay({
                        travel,
                        places,
                        placesLoading,
                    }: RouteByDayPropsType) {
    const context = useAppContext()

    async function removePlace(place: Place | Hotel) {
        if (!travel) return
        if (place instanceof Place) {
            travel.places_id = travel.places_id.filter(p => p !== place.id)
            await TravelController.update(context, travel)
                .catch(defaultHandleError)
            await PlaceController.delete(context, place)
                .catch(defaultHandleError)
            context.setTravel(new Travel(travel))
        } else {
            travel.hotels_id = travel.hotels_id.filter(h => h !== place.id)
            await TravelController.update(context, travel)
                .catch(defaultHandleError)
            await HotelController.delete(context, place)
                .catch(defaultHandleError)
            context.setTravel(new Travel(travel))
        }
    }


    return (
        <>
            <div className='route-tabs'>
                {Array.from({length: travel?.days || 0})
                    .map((_, i) =>
                        <Tab name={`День ${i + 1}`} to={`/travel/${travel?.id}/${i + 1}/`}/>
                    )
                }
            </div>

            <Container className='route-content content '>
                {placesLoading && <div className='center h-full'><Loader/></div>}
                <div className='h-full column gap-1'>
                    {places.map(p =>
                        p instanceof Place
                            ? <Swipe
                                rightElement={
                                    <div className='h-full center'>
                                        <TrashIcon className='icon' onClick={() => removePlace(p)}/>
                                    </div>
                                }
                            >
                                <PlaceCard key={p.id} className='flex-0' place={p}/>
                            </Swipe>
                            : <Swipe
                                rightElement={
                                    <div className='h-full center'>
                                        <TrashIcon className='icon' onClick={() => removePlace(p)}/>
                                    </div>
                                }
                            >
                                <HotelCard key={p.id} className='flex-0' hotel={p}/>
                            </Swipe>
                    )}
                </div>
            </Container>
        </>
    )
}

