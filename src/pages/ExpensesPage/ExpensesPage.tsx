import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {useSortedExpenses, useExpense, useExpenseFilterType} from "../../hooks";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import Container from "../../components/Container/Container";
import {useTravel} from "../../contexts/AppContextProvider";
import Button from "../../components/ui/Button/Button";
import {PageHeader, Tab} from "../../components/ui";
import Loader from "../../components/Loader/Loader";
import {ExpensesActual} from "./ExpensesActual";
import {EXPENSE_TYPE} from "../../constants";
import {ExpensesPlan} from "./ExpensesPlan";

import './ExpensesPage.css'


export function ExpensesPage() {
    const navigate = useNavigate()
    const travel = useTravel()
    const {travelCode, expenseType} = useParams()
    const {type, setExpenseType} = useExpenseFilterType()
    const {expenses, expensesLoading} = useExpense(travelCode || '')
    const sortedExpenses = useSortedExpenses(expenses)


    useEffect(() => {
        if(!expenseType){
            const type = localStorage.getItem(EXPENSE_TYPE) || 'actual'
            navigate(`/travel/${travelCode}/expenses/${type}/`)
        }else{
            localStorage.setItem(EXPENSE_TYPE, expenseType)
        }
    }, [expenseType]);


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
                        ? <ExpensesActual actual={sortedExpenses.actual} filterType={type} />
                        : <ExpensesPlan plan={sortedExpenses.plan} filterType={type} />
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