import React from 'react'
import {useNavigate} from "react-router-dom";

import IconButton from "../../components/ui/IconButton/IconButton";
import Navigation from "../../components/Navigation/Navigation";
import Container from "../../components/Container/Container";
import {useUser} from "../../hooks/redux-hooks";
import {PageHeader} from "../../components/ui";
import {useLangContext} from "../../contexts/LangContextProvider";




/**
 * компонент отображает добавленные маршруты в избранное
 * @function
 * @name Favorite
 * @category Pages
 */
export function Favorite() {
    const lang = useLangContext()
    const navigate = useNavigate()
    const user = useUser()


    return (
        <div className='wrapper'>
            <Container className='content'>
                <PageHeader title={lang.favorite} />
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
