import {useState} from "react";
import {useNavigate} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppDispatch, useTravel} from "../../hooks/redux-hooks";
import {useAppContext} from "../../contexts/AppContextProvider";
import {TravelController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import {updateTravel} from "../../redux/slices/travel-slice";
import Button from "../../components/ui/Button/Button";
import {Input, PageHeader} from "../../components/ui";
import {Member, Travel} from "../../core/classes";

export function TravelMembersSettings(){
    const navigate = useNavigate()
    const context = useAppContext()
    const dispatch = useAppDispatch()
    const {travel: stateTravel} = useTravel()
    const [memberName, setMemberName] = useState('')
    const [selected, setSelected] = useState<Member>()
    const [message, setMessage] = useState('')


    async function handleMemberAdd(){
        if(!selected) return
        if(!stateTravel) return
        const travel = new Travel(stateTravel)
        const r = Travel.addMember(travel, selected)
        if(r){
            try {
                await TravelController.update(context, travel)
                dispatch(updateTravel(travel))
            }catch (e){
                defaultHandleError(e as Error)
            }
        }
        navigate(-1)
    }


    return (
        <div className='wrapper'>
            <Container className='pb-20 column gap-0.5'>
                <PageHeader arrowBack title={"добавить участника"} />
                <Input value={memberName} onChange={setMemberName} placeholder={'Имя участника'} />
            </Container>
            <Container className='content'>
                {message && <h4>{message}</h4>}

            </Container>
            <div className='footer-btn-container footer'>
                <Button
                    onClick={handleMemberAdd}
                    disabled={!selected}
                    >
                    Добавить
                </Button>
            </div>
        </div>
    )
}
