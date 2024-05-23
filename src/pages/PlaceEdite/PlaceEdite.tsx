import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import RadioButtonGroup, {RadioButtonGroupItemType} from "../../components/ui/RadioButtonGroup/RadioButtonGroup";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppDispatch, usePlaces} from "../../hooks/redux-hooks";
import {useAppContext} from "../../contexts/AppContextProvider";
import {PlaceController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import {addPlace} from "../../redux/slices/places-slice";
import Button from "../../components/ui/Button/Button";
import {Time} from "../../components/ui/Time/Time";
import {PageHeader} from "../../components/ui";
import {Place} from "../../core/classes";


const density: RadioButtonGroupItemType[] = [
    {id: 0, title: 'Поверхностно:'},
    {id: 1, title: 'Обычно:'},
    {id: 2, title: 'Детально:'},
]


export function PlaceEdite() {
    const navigate = useNavigate()
    const context = useAppContext()
    const dispatch = useAppDispatch()
    const {placeCode} = useParams()
    const [place, setPlace] = useState<Place>();
    const {places} = usePlaces()
    const [currentDensity, setCurrentChange] = useState(density[0])
    const [change, setChange] = useState(false)


    useEffect(() => {
        if (!placeCode) return
        const p = places.find(p => p.id === placeCode)
        if (p) {
            setPlace(new Place(p))
        }
    }, [placeCode, places]);


    useEffect(() => {
        if(!place) return
        const md = (place.date_end.getTime() - place.date_start.getTime()) / 1000 * 60
        if(md <= 25) setCurrentChange(density[0])
        else if(md >= 90) setCurrentChange(density[2])
        else  setCurrentChange(density[1])
    }, [place]);
    console.log(currentDensity)


    function handleDateStartChange(date: Date){
        if(!place) return
        place.date_start = new Date(date)
        setPlace(new Place(place))
        if(!change) setChange(true)
    }


    function handleDateEndChange(date: Date){
        if(!place) return
        place.date_end = new Date(date)
        setPlace(new Place(place))
        if(!change) setChange(true)
    }


    function handleDensityChange(item: RadioButtonGroupItemType[]){
        if(!place) return
        setCurrentChange(item[0])
        switch (item[0].id){
            case 0:
                place.date_end = new Date(place.date_start.getTime() + 25 * 60 * 1000)
                break
            case 2:
                place.date_end = new Date(place.date_start.getTime() + 90 * 60 * 1000)
                break
            default:
                place.date_end = new Date(place.date_start.getTime() + 45 * 60 * 1000)
                break
        }
        setPlace(new Place(place))
        if(!change) setChange(true)
    }


    async function handleSaveChange() {
        if(!place) return
        if(!change) return
        PlaceController
            .update(context, place)
            .then(() => dispatch(addPlace(place)))
            .then(() => navigate(`/travel/${context.travel?.id}/`))
            .catch(defaultHandleError)
    }

    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={place?.name}/>
            </Container>
            <Container className='content column gap-1'>
                {place && (
                    <>
                        <section className='flex-stretch gap-0.25 block'>
                            <Time value={place.date_start} onChange={handleDateStartChange}/>
                            <Time value={place.date_end} onChange={handleDateEndChange}/>
                        </section>
                        <section>
                            <RadioButtonGroup checklist={density} init={currentDensity} title={'Глубина осмотра:'} onChange={handleDensityChange} />
                        </section>
                    </>
                )}
            </Container>
            <div className='footer-btn-container footer'>
                <Button disabled={!change} onClick={handleSaveChange}>Сохранить</Button>
            </div>
        </div>
    )
}