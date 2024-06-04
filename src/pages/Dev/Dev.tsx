import {useState} from "react";
import Container from "../../components/Container/Container";

import {DatePicker} from "../../components/DatePicker/DatePicker";
import './Dev.css'


export function Dev(){
    const [date, setDate] = useState<Date>()


    console.log(date)


    return (
        <Container className='pt-20'>
            <div className='grid'>
                <DatePicker className={'w-full'} value={date} onSubmit={setDate} />
                <DatePicker className={'w-full'} value={date} onSubmit={setDate} />

            </div>

        </Container>
    )
}