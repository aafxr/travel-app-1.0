import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppContext, useUser} from "../../contexts/AppContextProvider";
import {pushAlertMessage} from "../../components/Alerts";
import Container from "../../components/Container/Container";
import {Input, PageHeader} from "../../components/ui";
import Button from "../../components/ui/Button/Button";
import {Travel} from "../../core/classes";

import './TravelAdd.css'


/**
 * @name TravelAdd
 * @returns {JSX.Element}
 * @category Pages
 */
export function TravelAdd() {
    const navigate = useNavigate()
    const user = useUser()
    const context = useAppContext()

    const [title, setTitle] = useState('')

    /** обработчик добавления нового маршрута */
    async function handleAddRoute() {
        if (!title.length) {
            pushAlertMessage({type: "danger", message: "Необходимо указать название маршрута"})
            return
        }
        if (title.length && user) {
            const travel = new Travel({title, owner_id: user.id})
            context.setTravel(travel)
            navigate(`/travel/${travel.id}/settings/`)

            // TravelService.create(travel, user)
            //     .then(() => navigate(`/travel/${travel.id}/map/`))
            //     .catch(defaultHandleError)
        }
    }


    return (
        <>
            <div className='travel wrapper'>
                <Container className='content hide-scroll'>
                    <PageHeader arrowBack className='travel-destination'>
                        <div >
                            <Input
                                className='travel-destination-input'
                                value={title}
                                onChange={setTitle}
                                placeholder='Название поездки'
                            />
                        </div>
                    </PageHeader>
                    <div className='column gap-1'>
                        {/*<Link className='travel-link' to={'/travel/add/map/'}>*/}
                        {/*    <div className='icon'>*/}
                        {/*        <MapIcon/>*/}
                        {/*    </div>*/}
                        {/*    Указать на карте*/}
                        {/*</Link>*/}
                    </div>
                </Container>
                <div className='footer-btn-container footer'>
                    <Button onClick={handleAddRoute} disabled={!title}>Продолжить</Button>
                </div>
            </div>
        </>
    )
}
