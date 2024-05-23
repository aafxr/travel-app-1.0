import {useEffect, useState} from "react";

import {Place} from "../../core/classes";
import {useParams} from "react-router-dom";
import {usePlaces} from "../../hooks/redux-hooks";
import {PageHeader} from "../../components/ui";
import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {Time} from "../../components/ui/Time/Time";


export function PlaceEdite(){
    const {placeCode} = useParams()
    const [place, setPlace] = useState<Place>();
    const {places} = usePlaces()
    const [change, setChange] = useState(false)


    useEffect(() => {
        if(!placeCode) return
        const p = places.find(p => p.id === placeCode)
        if(p) setPlace(new Place(p))
    }, [placeCode, places]);



    async function handleSaveChange(){

    }

    return(
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={place?.name}/>
            </Container>
            <Container className='content'>
                <div className='flex-stretch gap-0.25'>
                    <Time value={place?.date_start}/>
                    <Time value={place?.date_end}/>
                </div>
            </Container>
            <div className='footer-btn-container footer'>
                <Button disabled={!change} onClick={handleSaveChange}>Сохранить</Button>
            </div>
        </div>
    )
}