import {useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import Container from "../../components/Container/Container";
import {useNewTravelContext} from "./useNewTravelContext";
import {fetchHotels} from "../../api/fetch/fetchHotels";
import Button from "../../components/ui/Button/Button";
import Counter from "../../components/Counter/Counter";
import {Input, PageHeader} from "../../components/ui";
import {TravelStepPropsType} from "./NewTravel";
import {Hotel} from "../../core/classes";

export function Step_AddHotel({next}: TravelStepPropsType){
    const ntc = useNewTravelContext()
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [selected, setSelected] = useState<Hotel | undefined>()
    const [inputHotelName, setInputHotelName] = useState<string>("")
    const [day, setDay] = useState(1)



    async function handelPlaceNameChange(text: string) {
        const _t = text.trim()
        try {
            const response = await fetchHotels(_t)
            const hotelsList = response.map(h => new Hotel(h))
            setHotels(hotelsList)
        } catch (e) {
            defaultHandleError(e as Error)
        } finally {
            setInputHotelName(_t)
        }
    }


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader
                    arrowBack
                    to={() => next(ntc.travel, 'Step_4_AddDetails')}
                    title={'Добавить отель'}
                />
                <div className='column gap-0.5'>
                    <Input value={inputHotelName} onChange={handelPlaceNameChange} delay={300}/>
                    <div className='flex-between align-center'><span>День:</span><Counter init={day} min={1} onChange={setDay}/></div>
                </div>

            </Container>
            <Container className='content pt-20'>
                <div className='column gap-1'>
                    {/* show hotels here*/}
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