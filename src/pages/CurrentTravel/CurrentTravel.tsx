import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {HotelController, PlaceController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useTravel} from "../../contexts/AppContextProvider";
import Container from "../../components/Container/Container";
import {MembersList} from "../../components/MembersList";
import dateRange from "../../utils/date-utils/dateRange";
import {Chip, PageHeader} from "../../components/ui";
import Loader from "../../components/Loader/Loader";
import {useMembers} from "../../hooks/useMembers";
import {Hotel, Place} from "../../core/classes";
import {Image} from "../../components/Image";
import {
    BellIcon, ChatIcon,
    ChecklistIcon,
    CopyIcon,
    LinkIcon,
    MenuIcon, MoneyIcon,
    VisibilityIcon,
} from "../../components/svg";

import './CurrentTravel.css'

export function CurrentTravel() {
    const context = useAppContext()
    const {travelCode, travelDay} = useParams()
    const navigate = useNavigate()

    const travel = useTravel()

    const [items, setItems] = useState<Array<Place | Hotel>>([])

    const {members, membersLoading} = useMembers()


    useEffect(() => {
        if(!travel) return
        if(!travelDay) navigate(`/travel/${travel.id}/1/`)
    }, [])


    useEffect(() => {
        if (!travelCode) {
            navigate('/')
            return
        }

        TravelController.read(context, travelCode)
            .then(t => t && context.setTravel(t))
            .catch(defaultHandleError)
    }, [])


    useEffect(() => {
        async function loadItems() {
            if (!travel) return

            const hotels = await HotelController.readAll(context, ...travel.hotels_id)
            const places = await PlaceController.readAll(context, ...travel.places_id)
            const items = [...hotels, ...places].sort((a, b) => a.date_start.getDay() - b.date_start.getTime())
            setItems(items)
        }

        loadItems().catch(defaultHandleError)
    }, [travel])

    console.log(members)

    return (
        <div className='current-travel wrapper'>
            <PageHeader className='current-travel-header transparent' arrowBack titleClassName='flex-end' MenuEl={<div><MenuIcon/></div>}>
                <div className='current-travel-icons'>
                    <span className='current-travel-icon'><CopyIcon className='icon'/></span>
                    <span className='current-travel-icon'><LinkIcon className='icon'/></span>
                    <span className='current-travel-icon'><BellIcon className='icon'/></span>
                </div>
            </PageHeader>
            <Container className='content' >
                <Image className='current-travel-image' src={travel?.previewPhotoId} alt={travel?.title} />
                <div className='current-travel-title'>
                    {travel?.title}
                    &nbsp;
                    <VisibilityIcon className='icon'/>
                </div>
                {!!travel?.description && <div className='current-travel-subtitle'>{travel?.description}</div>}
                {!!travel &&
                    <div className='current-travel-duration'>
                        <Chip  color={"orange"} rounded>
                            {dateRange(travel.date_start || '', travel.date_end || '')}
                        </Chip>
                    </div>
                }

                <div className='current-travel-members'>
                    { membersLoading
                            ? <div><Loader/></div>
                            : <MembersList members={members} />
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
                        <ChecklistIcon className='icon' />
                        &nbsp;
                        Чек-лист
                    </button>
                    <button className='rounded-button'>
                        <ChatIcon className='icon' />
                    </button>
                </div>
            </Container>
        </div>
    )
}

