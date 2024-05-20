import React from 'react'
import {useNavigate} from "react-router-dom";

import Container from "../../components/Container/Container";
import {PageHeader} from "../../components/ui";
import IconButton from "../../components/ui/IconButton/IconButton";
import Navigation from "../../components/Navigation/Navigation";
import {useUser} from "../../hooks/redux-hooks";



/**
 * Страница отображения ближайших рекомендуемых событий
 * @function
 * @name Events
 * @returns {JSX.Element}
 * @category Pages
 */
export function Events() {
    const navigate = useNavigate()
    const {user} = useUser()

    return (
        <div className='wrapper'>
            <Container className='content'>
                <PageHeader title={'События'} />
                {
                    user
                        ? (
                            <div className='column gap-1'>
                                В разработке
                            </div>
                        ) : (
                            <IconButton
                                border={false}
                                title='Авторизоваться'
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
