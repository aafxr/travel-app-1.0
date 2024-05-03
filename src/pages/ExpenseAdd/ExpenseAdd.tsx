import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {SectionController} from "../../core/service-controllers/SectionController";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useUser} from "../../contexts/AppContextProvider";
import {ExpenseController} from "../../core/service-controllers";
import NumberInput from "../../components/ui/Input/NumberInput";
import Checkbox from "../../components/ui/Checkbox/Checkbox";
import Container from "../../components/Container/Container";
import {Chip, Input, PageHeader} from "../../components/ui";
import Button from "../../components/ui/Button/Button";
import {Expense, Section} from "../../core/classes";
import {StoreName} from "../../types/StoreName";

import './ExpenseAdd.css'


export function ExpenseAdd() {
    const context = useAppContext()
    const user = useUser()!
    const navigate = useNavigate()
    const {expenseType, expenseCode, travelCode} = useParams()
    const [expense, setExpense] = useState<Expense>(new Expense({section_id:'misc', primary_entity_id: travelCode}))
    const [change, setChange] = useState(false)
    const [sections, setSections] = useState<Section[]>([])

    const inputRef = useRef<HTMLInputElement>(null)
    const numberRef = useRef<HTMLInputElement>(null)



    useEffect(() => {
        if(expenseCode){
            ExpenseController.read(context, expenseCode)
                .then(e => e && setExpense(e))
                .catch(defaultHandleError)
        } else {
            expense.variant = expenseType === 'actual' ? StoreName.EXPENSES_ACTUAL: StoreName.EXPENSES_PLAN
            expense.user_id = user.id
            setExpense(expense)
        }
    }, []);


    useEffect(() => {
        SectionController.readAll(context)
            .then(setSections)
            .catch(defaultHandleError)
    }, []);


    function handleSectionChange(section:Section){
        expense.section_id = section.id
        setExpense(new Expense(expense))
        if(!change) setChange(true)
    }


    function handleTitleChange(title:string){
        title = title.trim()
        expense.title = title
        setExpense(new Expense(expense))
        if(!change) setChange(true)
    }


    function handleValueChange(value:number) {
        expense.value = value
        setExpense(expense)
        if(!change) setChange(true)
    }


    function handlePersonalChange(personal: Boolean){
        expense.personal = personal ? 1 : 0
        setExpense(new Expense(expense))
        if(!change) setChange(true)
    }


    function handleSaveChanges(){
        inputRef.current?.classList.remove('danger-border')
        numberRef.current?.classList.remove('danger-border')

        if(!expense.title){
            inputRef.current?.classList.add('danger-border')
            inputRef.current?.focus()
            return
        }

        if(!expense.value){
            numberRef.current?.classList.add('danger-border')
            numberRef.current?.focus()
            return
        }
        /**update expense*/
        if(expenseCode){
            ExpenseController.update(context, expense)
                .then(() => navigate(-1))
                .catch(defaultHandleError)
            return
        }
        /**add new expense*/
        if(!expenseCode){
            ExpenseController.create(context, expense)
                .then(() => navigate(-1))
                .catch(defaultHandleError)
            return
        }
    }


    console.log({expenseType, expenseCode, travelCode}, expense)
    return(
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
                                color={expense.section_id === s.id ? "orange" : "grey"}
                            >{s.title}</Chip>
                        ))}
                    </div>
                </section>
                <section className='column block gap-1'>
                    <div>
                        <div className='title-bold'>На потратили:</div>
                        <Input ref={inputRef} value={expense.title} onChange={handleTitleChange} delay={300}/>
                    </div>
                    <div>
                        <div className='title-bold'>Сумма расходов:</div>
                        <NumberInput ref={numberRef} value={expense.value} onChange={handleValueChange} delay={300}/>
                    </div>
                    <Checkbox
                        left
                        checked={Boolean(expense.personal)}
                        onChange={handlePersonalChange}
                    >Личные</Checkbox>
                </section>
            </Container>
            <div className='footer-btn-container'>
            <Button onClick={handleSaveChanges} disabled={!change} >Добавить</Button>
            </div>
        </div>
    )
}