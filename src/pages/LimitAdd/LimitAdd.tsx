import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {ExpenseController, LimitController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {SectionController} from "../../core/service-controllers";
import NumberInput from "../../components/ui/Input/NumberInput";
import {currencyFormatter} from "../../utils/currencyFormatter";
import {useAppContext} from "../../contexts/AppContextProvider";
import Container from "../../components/Container/Container";
import Checkbox from "../../components/ui/Checkbox/Checkbox";
import {useAppDispatch} from "../../hooks/redux-hooks";
import Button from "../../components/ui/Button/Button";
import {Chip, PageHeader} from "../../components/ui";
import {Limit, Section} from "../../core/classes";
import {StoreName} from "../../types/StoreName";

import './LimitAdd.css'
import {addLimit} from "../../redux/slices/limit-slice";


const formatter = currencyFormatter()


export function LimitAdd(){
    const dispatch = useAppDispatch()
    const context = useAppContext()
    const navigate = useNavigate()
    const {travelCode, sectionCode} = useParams()
    const [sections, setSections] = useState<Section[]>([])
    const [limit, setLimit] = useState<Limit>(new Limit({primary_entity_id: travelCode, section_id: sectionCode}))
    const [change, setChange] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')


    useEffect(() => {
        if(sectionCode && travelCode) {
            limit.id = Limit.getCommonLimitID(sectionCode, travelCode)
            setLimit(new Limit(limit))
        }
    }, []);


    useEffect(() => {
        SectionController.readAll(context)
            .then(setSections)
            .catch(defaultHandleError)
    }, []);


    function handleSectionChange(section: Section){
        limit.section_id = section.id
        setLimit(new Limit(limit))
        if(!change) setChange(true)
    }


    function handleValueChange(value: number){
        limit.value = value
        setLimit(new Limit(limit))
        if(!change) setChange(true)
    }


    function handlePersonalChange(personal: boolean){
        const user = context.user
        if(!user) return
        if(personal) {
            limit.personal = 1
            limit.id = Limit.getPersonalLimitID(user.id, limit.section_id, limit.primary_entity_id)
        }else{
            limit.personal = 0
            limit.id = Limit.getCommonLimitID(limit.section_id, limit.primary_entity_id)
        }
        setLimit(new Limit(limit))
        if(!change) setChange(true)
    }


    async function handleSaveLimit(){
        if(!travelCode) return
        try {
            const extLimit = await LimitController.read(context, limit.id)
            let expenses = await ExpenseController.readByTravelID(context, travelCode)
            expenses = expenses.filter(e => e.variant === StoreName.EXPENSES_PLAN && e.section_id === limit.section_id)
            const total = expenses.reduce((a, e) => a + e.value, 0)
            if( limit.value < total) {
                setErrorMsg(`сумма Лимита должна быть больше ${formatter.format(total)}`)
                return
            }
            extLimit
                ? await LimitController.update(context, limit)
                : await LimitController.create(context, limit)
            dispatch(addLimit(limit))
            navigate(-1)
        }catch (e){
            defaultHandleError(e as Error)
        }
    }


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Добавить расходы'}/>
            </Container>
            <Container className='content'>
                <section className='block column gap-1'>
                    <div className='title-bold'>Категории</div>
                    <div className='flex-wrap gap-1'>
                        {sections.map(s => (
                            <Chip
                                key={s.id}
                                rounded
                                onClick={() => handleSectionChange(s)}
                                color={limit.section_id === s.id ? "orange" : "grey"}
                            >{s.title}</Chip>
                        ))}
                    </div>
                </section>
                <section className='column block gap-1'>
                    <div>
                        <NumberInput value={limit.value} onChange={handleValueChange} />
                        {errorMsg && <div className='limit-message'>{errorMsg}</div>}
                    </div>
                    <Checkbox left checked={Boolean(limit.personal)} onChange={handlePersonalChange}>Личный</Checkbox>
                </section>
            </Container>
            <div className='footer-btn-container footerr'>
                <Button disabled={!change} onClick={handleSaveLimit} >Добавить</Button>
            </div>
        </div>
    )
}