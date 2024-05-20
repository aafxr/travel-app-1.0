import { useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import PlaceCard from "../../components/cards/PlaceCard/PlaceCard";
import Container from "../../components/Container/Container";
import {useNewTravelContext} from "./useNewTravelContext";
import {CheckIcon, PlusIcon} from "../../components/svg";
import Button from "../../components/ui/Button/Button";
import Counter from "../../components/Counter/Counter";
import {Input, PageHeader} from "../../components/ui";
import {Place, Travel} from "../../core/classes";
import {TravelStepPropsType} from "./NewTravel";
import {fetchPlaces} from "../../api/fetch";

import './NewTravel.css'

export function Step_AddPlace({next}: TravelStepPropsType) {
    const ntc = useNewTravelContext()
    const [places, setPlaces] = useState<Place[]>([])
    const [selected, setSelected] = useState<Place | undefined>()
    const [inputPlaceName, setInputPlaceName] = useState<string>("")
    const [day, setDay] = useState(1)


    async function handelPlaceNameChange(text: string) {
        const _t = text.trim()
        try {
            const response = await fetchPlaces(_t)
            const placesList = response.map(p => new Place(p))
            setPlaces(placesList)
        } catch (e) {
            defaultHandleError(e as Error)
        } finally {
            setInputPlaceName(_t)
        }
    }


    function handlePlaceClick(p: Place){
        if(p.id === selected?.id) return
        setSelected(p)
        setInputPlaceName(p.name)
    }


    function handlePlaceAdd(){
        if(!selected) return
        const place = new Place(selected)
        place.id = Place.getID(ntc.travel, selected.id)
        place.day = day
        ntc.places.push(place)
        ntc.travel.places_id.push(place.id)
        next(new Travel(ntc.travel),"Step_4_AddDetails")
    }


    return (
        <div className='wrapper'>

            <Container className='pb-20'>
                <PageHeader
                    arrowBack
                    to={() => next(ntc.travel, 'Step_4_AddDetails')}
                    title={'Добавить локацию'}
                />
                <div className='column gap-0.5'>
                    <Input value={inputPlaceName} onChange={handelPlaceNameChange} delay={300}/>
                    <div className='flex-between align-center'> <span>День:</span><Counter init={day} min={1} onChange={setDay} /></div>
                </div>
            </Container>
            <Container className='content'>
                <div className='column gap-1'>
                    {places.map(p => (
                        <PlaceCard key={p.id} place={p}>
                            <div className='add-place-container'>
                                <button
                                    className='rounded-btn border'
                                    onClick={() => handlePlaceClick(p)}
                                >
                                    {p.id === selected?.id
                                        ? <CheckIcon className='icon' />
                                        : <PlusIcon className='icon/2' />
                                    }
                                </button>
                            </div>
                        </PlaceCard>
                    ))}
                </div>
            </Container>
            <div className='footer-btn-container'>
                <Button
                    onClick={handlePlaceAdd}
                    disabled={!selected}
                >
                    Добавить
                </Button>

            </div>
        </div>
    )
}