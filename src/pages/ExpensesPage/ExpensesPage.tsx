import {useState} from "react";
import {useParams} from "react-router-dom";

import {ExpenseVariantType} from "../../types/ExpenseVariantType";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import Container from "../../components/Container/Container";
import {PageHeader, Tab} from "../../components/ui";
import Loader from "../../components/Loader/Loader";
import {useExpense} from "../../hooks/useExpense";
import {StoreName} from "../../types/StoreName";

import './ExpensesPage.css'

export function ExpensesPage(){
    const {travelCode, expenseType} = useParams()
    const [type, setType] = useState<Omit<ExpenseFilterType, 'all'>>(localStorage.expensesType || expenseType || StoreName.EXPENSES_ACTUAL)
    const {expenses, expensesLoading} = useExpense(travelCode || '', type as ExpenseVariantType)

    return(
        <div className='wrapper'>
            <Container>
                <PageHeader title={'Бюджет'} arrowBack />
            </Container>
            <div className='expenses-tabs'>
                <Tab name={'Планы'} to={`/travel/${travelCode}/plan/`} />
                <Tab name={'Расходы'} to={`/travel/${travelCode}/actual/`} />
            </div>
            <Container className='expenses-content content'>
                {expensesLoading && <div className='h-full center'><Loader /></div>}

            </Container>
        </div>
    )
}