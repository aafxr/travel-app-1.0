import {useState} from "react";
import Container from "../../components/Container/Container";

import {DatePicker} from "../../components/DatePicker/DatePicker";
import './Dev.css'
import {Time} from "../../components/ui/Time/Time";


export function Dev(){
    const [date, setDate] = useState<Date>(new Date())


    console.log(date)


    return (
        <Container className='pt-20'>
            <div className='grid'>
                <Time value={date} onChange={setDate}/>
                <Time value={date} onChange={console.log} />
            </div>

        </Container>
    )
}