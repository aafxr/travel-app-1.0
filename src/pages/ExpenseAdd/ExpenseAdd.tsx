import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppDispatch, useTravel, useUser} from "../../hooks/redux-hooks";
import {Chip, DropDown, Input, PageHeader} from "../../components/ui";
import {SectionController} from "../../core/service-controllers";
import {ExpenseController} from "../../core/service-controllers";
import {useAppContext} from "../../contexts/AppContextProvider";
import NumberInput from "../../components/ui/Input/NumberInput";
import Checkbox from "../../components/ui/Checkbox/Checkbox";
import Container from "../../components/Container/Container";
import {addExpense} from "../../redux/slices/expenses-slice";
import {Currency} from "../../core/classes/store/Currency";
import {loadLimits} from "../../redux/slices/limit-slice";
import Button from "../../components/ui/Button/Button";
import {CurrencyType} from "../../types/CurrencyType";
import {Expense, Section} from "../../core/classes";
import {StoreName} from "../../types/StoreName";

import './ExpenseAdd.css'
import {CURRENCY_SYMBOL_LIST} from "../../constants";


export function ExpenseAdd() {
    const dispatch = useAppDispatch()
    const context = useAppContext()
    const {travel} = useTravel()
    const {user} = useUser()
    const navigate = useNavigate()
    const {expenseType, expenseCode, travelCode} = useParams()
    const [expense, setExpense] = useState<Expense>(new Expense({section_id: 'misc', primary_entity_id: travelCode}))
    const [change, setChange] = useState(false)
    const [sections, setSections] = useState<Section[]>([])

    const inputRef = useRef<HTMLInputElement>(null)
    const numberRef = useRef<HTMLInputElement>(null)

    const expenseRef = useRef<HTMLInputElement>(null)
    const [expenseSelectOpen, setExpenseSelectOpen] = useState(false)


    useEffect(() => {
        if (expenseCode) {
            ExpenseController.read(context, expenseCode)
                .then(e => e && setExpense(e))
                .catch(defaultHandleError)
        } else {
            expense.variant = expenseType === 'actual' ? StoreName.EXPENSES_ACTUAL : StoreName.EXPENSES_PLAN
            expense.user_id = user?.id || 'undefined'
            setExpense(expense)
        }
    }, []);


    useEffect(() => {
        SectionController.readAll(context)
            .then(setSections)
            .catch(defaultHandleError)
    }, []);


    function handleSectionChange(section: Section) {
        expense.section_id = section.id
        setExpense(new Expense(expense))
        if (!change) setChange(true)
    }


    function handleTitleChange(title: string) {
        title = title.trim()
        expense.title = title
        setExpense(new Expense(expense))
        if (!change) setChange(true)
    }


    function handleValueChange(value: number) {
        expense.value = value
        setExpense(expense)
        if (!change) setChange(true)
    }


    function handlePersonalChange(personal: Boolean) {
        expense.personal = personal ? 1 : 0
        setExpense(new Expense(expense))
        if (!change) setChange(true)
    }


    function handleExpenseSelectChange(text: string) {
        const e = new Expense(expense)
        const code = Currency.getCodeBySymbol(text as CurrencyType['symbol'])
        if (e.currency !== code) {
            e.currency = code
            if (!change) setChange(true)
            setExpense(e)
        }
    }


    function handleSaveChanges() {
        if (!travel) return
        inputRef.current?.classList.remove('danger-border')
        numberRef.current?.classList.remove('danger-border')

        if (!expense.title) {
            inputRef.current?.classList.add('danger-border')
            inputRef.current?.focus()
            return
        }

        if (!expense.value) {
            numberRef.current?.classList.add('danger-border')
            numberRef.current?.focus()
            return
        }
        /**update expense*/
        if (expenseCode) {
            ExpenseController.update(context, expense)
                .then(() => dispatch(addExpense(expense)))
                .then(() => navigate(-1))
                .catch(defaultHandleError)
            return
        }
        /**add new expense*/
        if (!expenseCode) {
            ExpenseController.create(context, expense)
                .then(() => dispatch(addExpense(expense)))
                .then(() => dispatch(loadLimits({ctx: context, travel})))
                .then(() => navigate(-1))
                .catch(defaultHandleError)
            return
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
                                color={expense.section_id === s.id ? "orange" : "grey"}
                            >{s.title}</Chip>
                        ))}
                    </div>
                </section>
                <section className='column block gap-1'>
                    <div>
                        <div className='title-bold'>На что потратили:</div>
                        <Input
                            ref={inputRef}
                            value={expense.title}
                            onChange={handleTitleChange}
                            delay={300}
                        />
                    </div>
                    <div>
                        <div className='title-bold'>Сумма расходов:</div>
                        <div className='relative'>
                            <NumberInput
                                ref={numberRef}
                                className="expense-input"
                                value={expense.value}
                                onChange={handleValueChange}
                                delay={300}
                            />
                            <div
                                ref={expenseRef}
                                className='expense-symbol'
                                onClick={()=> setExpenseSelectOpen(!expenseSelectOpen)}
                            >{Currency.getSymbolByCode(expense.currency)}</div>
                        </div>

                        <DropDown
                            max={5}
                            visible={expenseSelectOpen}
                            onVisibleChange={setExpenseSelectOpen}
                            onSubmit={handleExpenseSelectChange}
                            node={expenseRef}
                            items={CURRENCY_SYMBOL_LIST}
                        />
                    </div>
                    <Checkbox
                        left
                        checked={Boolean(expense.personal)}
                        onChange={handlePersonalChange}
                    >Личные</Checkbox>
                </section>
            </Container>
            <div className='footer-btn-container'>
                <Button onClick={handleSaveChanges} disabled={!change}>Добавить</Button>
            </div>
        </div>
    )
}