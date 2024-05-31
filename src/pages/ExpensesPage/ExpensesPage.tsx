import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {PageHeader, Tab} from "../../components/ui";
import {useExpenseFilterType} from "../../hooks";
import {ExpensesActual} from "./ExpensesActual";
import {EXPENSE_TYPE} from "../../constants";
import {ExpensesPlan} from "./ExpensesPlan";

import './ExpensesPage.css'
import {useTravel} from "../../hooks/redux-hooks";
import {useLangContext} from "../../contexts/LangContextProvider";


export function ExpensesPage() {
    const lang = useLangContext()
    const navigate = useNavigate()
    const {travel} = useTravel()
    const {travelCode, expenseType} = useParams()
    const {type, setExpenseType} = useExpenseFilterType()


    useEffect(() => {
        if (!expenseType) {
            const type = localStorage.getItem(EXPENSE_TYPE) || 'actual'
            navigate(`/travel/${travelCode}/expenses/${type}/`)
        } else {
            localStorage.setItem(EXPENSE_TYPE, expenseType)
        }
    }, [expenseType]);


    function handleExpensesFilterTypeChange(type: ExpenseFilterType) {
        setExpenseType(type)
    }

    return (
        <div className='wrapper'>
            <Container>
                <PageHeader to={`/travel/${travelCode}/`} title={lang.budget} arrowBack/>
            </Container>
            <div className='expenses-tabs'>
                <Tab name={lang.expenses} to={`/travel/${travelCode}/expenses/actual/`}/>
                <Tab name={lang.plans} to={`/travel/${travelCode}/expenses/plan/`}/>
            </div>
            <Container className='expenses-content content'>
                {expenseType === 'actual'
                    ? <ExpensesActual filterType={type}/>
                    : <ExpensesPlan filterType={type}/>
                }
            </Container>
            {Boolean(travel?.members_count) && (
                <div className='footer-btn-container footer flex-between gap-1'>
                    <Button active={type === "personal"}
                            onClick={() => handleExpensesFilterTypeChange("personal")}>{lang.personal}</Button>
                    <Button active={type === "common"}
                            onClick={() => handleExpensesFilterTypeChange("common")}>{lang.common}</Button>
                    <Button active={type === "all"} onClick={() => handleExpensesFilterTypeChange("all")}>{lang.all}</Button>
                </div>
            )
            }
        </div>
    )
}