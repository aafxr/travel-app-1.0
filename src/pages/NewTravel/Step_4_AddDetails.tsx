import {TravelStepPropsType} from "./NewTravel";
import {useNewTravelContext} from "./useNewTravelContext";

import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {PageHeader} from "../../components/ui";
import {Travel} from "../../core/classes";

import './Step_4_AddDetails.css'

export function Step_4_AddDetails({next}: TravelStepPropsType){
    const ntc = useNewTravelContext()



    async function handleNextStep(){
        next(new Travel(ntc.travel))
    }

    return (
        <div className='wrapper'>
            <Container>
                <PageHeader title='Детали путешествия' />
            </Container>

            <Container className='content'>
                <div className='block'>
                    Добавить отель
                </div>
                <div className='block'>
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