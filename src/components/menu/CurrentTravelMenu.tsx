import {useNavigate} from "react-router-dom";

import {useLangContext} from "../../contexts/LangContextProvider";
import {useTravel} from "../../hooks/redux-hooks";
import Menu from "../ui/Menu/Menu";

export function CurrentTravelMenu(){
    const lang = useLangContext()
    const navigate = useNavigate()
    const {travel} = useTravel()


    function handleAddPlace(){
        if(!travel) return
        navigate(`/travel/${travel.id}/newPlace/`)
    }


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
            <Menu.Item arrow onClick={handleAddPlace}>{lang.addLocation}</Menu.Item>
            <hr/>
            <Menu.Item arrow onClick={handleEditeTravelChange}>{lang.editeDescription}</Menu.Item>
            <Menu.Item arrow onClick={handleDateChange}>{lang.travelDate}</Menu.Item>
            <Menu.Item arrow onClick={handleMembersChange}>{lang.travelDate}</Menu.Item>
            <Menu.Item arrow onClick={handleSettingsChange}>{lang.settings}</Menu.Item>
        </Menu>
    )
}