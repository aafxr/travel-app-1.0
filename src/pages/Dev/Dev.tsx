import {useState} from "react";
import Container from "../../components/Container/Container";

import {DatePicker} from "../../components/DatePicker/DatePicker";
import './Dev.css'


export function Dev(){
    const [date, setDate] = useState<Date>(() => new Date())


    console.log(date)


    return (
        <Container className='pt-20'>
            <DatePicker init={date} onSubmit={setDate} />

        </Container>
    )
}