import {useNavigate} from "react-router-dom";

import {useTravel} from "../../hooks/redux-hooks";
import Menu from "../ui/Menu/Menu";

export function CurrentTravelMenu(){
    const navigate = useNavigate()
    const {travel} = useTravel()


    function handleDateChange(){
        if(!travel) return
        navigate(`/travel/${travel.id}/date/`)
    }


    function handleMembersChange(){
        if(!travel) return
        navigate(`/travel/${travel.id}/members/`)
    }


    function handleSettingsChange(){
        if(!travel) return
        navigate(`/travel/${travel.id}/rules/`)
    }

    function handleEditeTravelChange(){
        if(!travel) return
        navigate(`/travel/${travel.id}/edite/`)
    }


    return (
        <Menu>
            <Menu.Item arrow onClick={handleEditeTravelChange}>Редактировать описание</Menu.Item>
            <Menu.Item arrow onClick={handleDateChange}>Дата поездки</Menu.Item>
            <Menu.Item arrow onClick={handleMembersChange}>Участники</Menu.Item>
            <Menu.Item arrow onClick={handleSettingsChange}>Настройки</Menu.Item>
        </Menu>
    )
}