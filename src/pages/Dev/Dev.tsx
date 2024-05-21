import Container from "../../components/Container/Container";

import './Dev.css'
import {Time} from "../../components/ui/Time/Time";

export function Dev(){
    return (
        <Container className='pt-20'>
            <Time value={new Date()} />


        </Container>
    )
}