import {useParams} from "react-router-dom";

import {useSortedExpenses, useExpense, useExpenseFilterType} from "../../hooks";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import Container from "../../components/Container/Container";
import {useTravel} from "../../contexts/AppContextProvider";
import Button from "../../components/ui/Button/Button";
import {PageHeader, Tab} from "../../components/ui";
import Loader from "../../components/Loader/Loader";
import {StoreName} from "../../types/StoreName";
import {ExpensesActual} from "./ExpensesActual";
import {ExpensesPlan} from "./ExpensesPlan";

import './ExpensesPage.css'


export function ExpensesPage() {
    const travel = useTravel()
    const {travelCode, expenseType} = useParams()
    const {type, setExpenseType} = useExpenseFilterType()
    const {expenses, expensesLoading} = useExpense(travelCode || '')
    const sortedExpenses = useSortedExpenses(expenses)


    function handleExpensesFilterTypeChange(type: ExpenseFilterType) {
        setExpenseType(type)
    }

    return (
        <div className='wrapper'>
            <Container>
                <PageHeader to={`/travel/${travelCode}/`} title={'Бюджет'} arrowBack/>
            </Container>
            <div className='expenses-tabs'>
                <Tab name={'Расходы'} to={`/travel/${travelCode}/expenses/actual/`}/>
                <Tab name={'Планы'} to={`/travel/${travelCode}/expenses/plan/`}/>
            </div>
            <Container className='expenses-content content'>
                {expensesLoading
                    ? <div className='h-full center'><Loader/></div>
                    : expenseType === 'actual'
                        ? <ExpensesActual actual={sortedExpenses.actual}/>
                        : <ExpensesPlan plan={sortedExpenses.plan}/>
                }
            </Container>
            {Boolean(travel?.members_count) && (
                <div className='footer-btn-container footer flex-between gap-1'>
                    <Button active={type === "personal"}
                            onClick={() => handleExpensesFilterTypeChange("personal")}>Личные</Button>
                    <Button active={type === "common"}
                            onClick={() => handleExpensesFilterTypeChange("common")}>Общие</Button>
                    <Button active={type === "all"} onClick={() => handleExpensesFilterTypeChange("all")}>Все</Button>
                </div>
            )
            }
        </div>
    )
}