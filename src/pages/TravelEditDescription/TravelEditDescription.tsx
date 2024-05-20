import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppDispatch, useTravel} from "../../hooks/redux-hooks";
import {useAppContext} from "../../contexts/AppContextProvider";
import {Input, PageHeader, TextArea} from "../../components/ui";
import {TravelController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import {updateTravel} from "../../redux/slices/travel-slice";
import Button from "../../components/ui/Button/Button";
import {Travel} from "../../core/classes";


export function TravelEditDescription() {
    const navigate = useNavigate()
    const context = useAppContext()
    const dispatch = useAppDispatch()
    const {travel: stateTravel} = useTravel()
    const [travel, setTravel] = useState<Travel>()
    const [change, setChange] = useState(false)


    useEffect(() => {
        if (!stateTravel) return
        setTravel(new Travel(stateTravel))
    }, []);


    function handleTitleChange(text: string){
        if(!travel) return
        const t = text.trim()
        travel.title = t
        setTravel(new Travel(travel))
        if(!change) setChange(true)
    }


    function handleDescriptionChange(text:string){
        if(!travel) return
        const t = text.trim()
        travel.description = t
        setTravel(new Travel(travel))
        if(!change) setChange(true)
    }


    async function handleSaveChanges(){
        if (!travel) return
        if (!change) return
        try {
            await TravelController.update(context, travel)
            dispatch(updateTravel(travel))
        }catch (e){
            defaultHandleError(e as Error)
        }
        navigate(-1)
    }

    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Описание маршрута'}/>
            </Container>
            <Container className='content column gap-0.5'>
                <section className='block'>
                    <div className='title-semi-bold'>Название путешествия:</div>
                    <Input value={travel?.title || ''} onChange={handleTitleChange} delay={300}/>
                </section>
                <section className='block'>
                    <div className='title-semi-bold'>Название путешествия:</div>
                    <TextArea value={travel?.description || ''} onChange={handleDescriptionChange} />
                </section>
            </Container>
            <div className='footer-btn-container'>
                <Button
                    onClick={handleSaveChanges}
                    disabled={!change}
                >
                    Сохранить
                </Button>
            </div>
        </div>
    )
}