import Container from "../../components/Container/Container";

import {AppDatePicker} from "../../components/AppDatePicker/AppDatePicker";
import './Dev.css'


export function Dev(){
    return (
        <Container className='pt-20'>
            <AppDatePicker date={new Date()} />

        </Container>
    )
}