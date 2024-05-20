import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useTravel} from "../../hooks/redux-hooks";
import {useAppContext} from "../../contexts/AppContextProvider";
import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {PageHeader} from "../../components/ui";
import {Travel} from "../../core/classes";
import Checkbox from "../../components/ui/Checkbox/Checkbox";
import {TravelController} from "../../core/service-controllers";
import {updateTravel} from "../../redux/slices/travel-slice";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";

export function TravelRules() {
    const context = useAppContext()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {travel: stateTravel} = useTravel()
    const [travel, setTravel] = useState<Travel>()
    const [change, setChange] = useState(false)


    useEffect(() => {
        if (!stateTravel) return
        setTravel(new Travel(stateTravel))
    }, []);


    function handlePermissionCahnge(key: keyof Travel["permission"]){
        const t = new Travel(travel)
        t.permission[key] = t.permission[key] ? 0 : 1
        setTravel(t)
        if(!change) setChange(true)
    }


    async function handleSaveRulesChange(){
        if(!change) return
        if(!travel) return
        try {
            await TravelController.update(context, travel)
            dispatch(updateTravel(travel))
        }catch (e){
            defaultHandleError(e as Error)
        }
        navigate(-1)
    }

    if (!travel)
        return null


    return (
        <div className='wrapper'>
            <Container className='pb-20'>
                <PageHeader arrowBack title={'Настройки путшествия'}/>
            </Container>
            <Container className="content column gap-1">
                <Checkbox checked={!!travel.permission.public} onChange={() => handlePermissionCahnge("public")}>Пубилчное</Checkbox>
                <Checkbox checked={!!travel.permission.showCheckList} onChange={() => handlePermissionCahnge("showCheckList")}>Показывать чеклист</Checkbox>
                <Checkbox checked={!!travel.permission.showComments} onChange={() => handlePermissionCahnge("showComments")}>Показывать комментарии</Checkbox>
                <Checkbox checked={!!travel.permission.showExpenses} onChange={() => handlePermissionCahnge("showExpenses")}>Показывать расходы</Checkbox>
                <Checkbox checked={!!travel.permission.showRoute} onChange={() => handlePermissionCahnge("showRoute")}>Показывать маршрут</Checkbox>
            </Container>
            <div className='footer-btn-container'>
                <Button
                    onClick={handleSaveRulesChange}
                    disabled={!change}
                >
                    Сохранить
                </Button>

            </div>
        </div>
    )

}