import {TravelStepPropsType} from "./NewTravel";
import {useNewTravelContext} from "./useNewTravelContext";

import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {PageHeader} from "../../components/ui";
import {Travel} from "../../core/classes";


export function Step_4_AddDetails({next}: TravelStepPropsType){
    const ntc = useNewTravelContext()


    function handleAddPlace(){
        next(ntc.travel, "Step_AddPlace")
    }

    function handleAddHotel(){
        next(ntc.travel, "Step_AddHotel")
    }


    async function handleNextStep(){
        next(new Travel(ntc.travel))
    }


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader
                    arrowBack
                    to={() => next(ntc.travel, "Step_2_TravelSettings")}
                    title='Детали путешествия'
                />
            </Container>

            <Container className='content'>
                <div
                    className='block'
                    onClick={handleAddHotel}
                >
                    Добавить отель
                </div>
                <div
                    className='block'
                    onClick={handleAddPlace}
                >
                    Добавить место
                </div>
            </Container>
            <div className='footer-btn-container'>
                <Button onClick={handleNextStep}>
                    Создать пуешествие
                </Button>
            </div>

        </div>
    )
}