import {useEffect, useState} from "react";
import Container from "../../components/Container/Container";
import {useNewTravelContext} from "./useNewTravelContext";
import Button from "../../components/ui/Button/Button";
import {Input, PageHeader} from "../../components/ui";
import {TravelStepPropsType} from "./NewTravel";
import {Travel} from "../../core/classes";

export function Step_1_TravelName({next}: TravelStepPropsType) {
    const ntc = useNewTravelContext()
    const [travelName, setTravelName] = useState<string>('');

    useEffect(() => {
        setTravelName(ntc.travel.title)
    }, [])


    function handleNext() {
        const travel = new Travel(ntc.travel)
        travel.title = travelName
        next(travel)
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