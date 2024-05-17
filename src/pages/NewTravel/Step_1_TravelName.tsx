import {useEffect, useState} from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {Input, PageHeader} from "../../components/ui";
import {TravelStepPropsType} from "./NewTravel";
import {Travel} from "../../core/classes";

export function Step_1_TravelName({travel, next}: TravelStepPropsType) {
    const [travelName, setTravelName] = useState<string>('');

    useEffect(() => {
        setTravelName(travel.title)
    }, [])


    function handleNext() {
        const _travel = new Travel(travel)
        _travel.title = travelName
        next(_travel)
    }


    return(
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack to={'/'} >
                    <Input value={travelName} onChange={setTravelName} />
                </PageHeader>
            </Container>
            <Container className='container'>

            </Container>
            <div>
                <Button
                    onClick={handleNext}
                    disabled={!travelName.length}
                    >Продолжить</Button>
            </div>
        </div>
    )
}