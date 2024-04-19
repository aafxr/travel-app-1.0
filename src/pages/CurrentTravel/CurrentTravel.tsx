import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {TravelController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import {PageHeader} from "../../components/ui";

export function CurrentTravel() {
    const context = useAppContext()
    const {travelCode} = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (!travelCode) {
            navigate('/')
            return
        }

        TravelController.read(context, travelCode)
            .then(t => {
                console.log(t)
                if (t) {
                    context.setTravel(t)
                }
            })
            .catch(defaultHandleError)
    }, [])


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack to={'/'} title={'Current Travel'}/>
            </Container>
            <Container className='content'>
                content
            </Container>
        </div>
    )
}