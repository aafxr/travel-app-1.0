import React from 'react'
import {useNavigate} from "react-router-dom";

import Navigation from "../../components/Navigation/Navigation";
import Container from "../../components/Container/Container";
import {useUser} from "../../contexts/AppContextProvider";
import Menu from "../../components/ui/Menu/Menu";
import {PageHeader} from "../../components/ui";

import './Main.css'

/**
 * компонент отображает главную страницу приложения
 * @function
 * @name Main
 * @category Pages
 */
export function Main() {
    const navigate = useNavigate()
    const user = useUser()
    // const context = useAppContext()

    function handleNewTravel() {
        if (user) {
            navigate(`/travel/add/`)
        } else {
            navigate('/login/')
        }
    }

    function handleCreateNewTravel(){
        navigate(`/newTravel/`)
    }


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader title={'Главная страница'} MenuEl={<Menu/>}/>
            </Container>
            <Container className='content pb-20'>
                <div className='banner' style={{
                    backgroundImage: 'url(/images/main.jpg)'
                }}>
                    <h2 className='banner-title'>Спланируйте поездку за минуты</h2>
                    <button
                        className='banner-button'
                        onClick={handleNewTravel}
                    >
                        {user ? 'Новая поездка' : 'Авторизоваться'}
                    </button>
                    {Boolean(user) && (
                        <button
                            className='banner-button'
                            onClick={handleCreateNewTravel}
                        >
                            {'Новая поездка'}
                        </button>
                    )}
                </div>


                {/*<PopularSection />*/}
                {/*<RecommendSection routes={[]}/>*/}

                {/*<IconButton*/}
                {/*    border={false}*/}
                {/*    title='+ Добавить'*/}
                {/*    className='link'*/}
                {/*    onClick={() => navigate('/travel/add/')}*/}
                {/*/>*/}
            </Container>
            {/*<YandexMapContainer className='content'>*/}
            {/*    {test_places.map((p, idx) => (*/}
            {/*        <YPlacemark key={idx} coordinates={[p.location[0], p.location[1]]} iconContent={`${idx}`}/>*/}
            {/*    ))}*/}
            {/*    <YPolyline rout={test_places.slice(0, test_places.length /2).map(p => [p.location[0],p.location[1]])} strokeWidth={3} strokeColor={'#329811'}/>*/}
            {/*    <YPolyline rout={test_places.slice(test_places.length /2).map(p => [p.location[0],p.location[1]])} strokeWidth={3} strokeColor={'#000f11'}/>*/}
            {/*</YandexMapContainer>*/}
            <Navigation className='footer'/>
        </div>
    )
}
