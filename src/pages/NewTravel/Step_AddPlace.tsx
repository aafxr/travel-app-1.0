import {TravelStepPropsType} from "./NewTravel";
import {useNewTravelContext} from "./useNewTravelContext";
import Container from "../../components/Container/Container";
import {Input, PageHeader} from "../../components/ui";
import Button from "../../components/ui/Button/Button";
import {useEffect, useState} from "react";
import {Place} from "../../core/classes";
import {fetchPlaces} from "../../api/fetch";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {PlaceCard} from "../../components/PlaceCard/PlaceCard";

export function Step_AddPlace({next}: TravelStepPropsType) {
    const ntc = useNewTravelContext()
    const [places, setPlaces] = useState<Place[]>([])
    const [selected, setSelected] = useState<Place | undefined>()
    const [inputPlaceName, setInputPlaceName] = useState<string>("")


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


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader
                    arrowBack
                    to={() => next(ntc.travel, 'Step_4_AddDetails')}
                    title={'Добавить локацтю'}
                />
                <Input value={inputPlaceName} onChange={handelPlaceNameChange} delay={300}/>
            </Container>
            <Container className='content pt-20'>
                <div className='column gap-1'>
                    {places.map(p => (
                        <PlaceCard key={p.id} place={p}/>
                    ))}
                </div>
            </Container>
            <div className='footer-btn-container'>
                <Button
                    disabled={!selected}
                >
                    Добавить
                </Button>

            </div>
        </div>
    )
}