import React from 'react'
import {useNavigate} from "react-router-dom";

import Container from "../../components/Container/Container";
import {PageHeader} from "../../components/ui";
import IconButton from "../../components/ui/IconButton/IconButton";
import Navigation from "../../components/Navigation/Navigation";
import {useUser} from "../../hooks/redux-hooks";
import {useLangContext} from "../../contexts/LangContextProvider";



/**
 * Страница отображения ближайших рекомендуемых событий
 * @function
 * @name Events
 * @category Pages
 */
export function Events() {
    const lang = useLangContext();
    const navigate = useNavigate()
    const {user} = useUser()

    return (
        <div className='wrapper'>
            <Container className='content'>
                <PageHeader title={lang.events} />
                {
                    user
                        ? (
                            <div className='column gap-1'>
                                {lang.inDeveloping}
                            </div>
                        ) : (
                            <IconButton
                                border={false}
                                title={lang.authorize}
                                className='link'
                                onClick={() => navigate('/login/')}
                            />
                        )
                }
            </Container>
            <Navigation className='footer'/>
        </div>
    )
}
