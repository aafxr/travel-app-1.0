import {useLocation, useNavigate} from "react-router-dom";

import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import {SortedExpensesType} from "../../hooks";
import {PlusIcon} from "../../components/svg";

type ExpensesPlanPropsType = {
    plan: SortedExpensesType['plan']
    filterType: ExpenseFilterType
}


export function ExpensesPlan({plan, filterType}: ExpensesPlanPropsType){
    const location = useLocation()
    const navigate = useNavigate()


    const  handleAddExpense = () => navigate(location.pathname + 'add/')

    return (
        <>
            <button className='expense-btn' onClick={handleAddExpense}>
                <div className='expense-btn-icon'>
                    <PlusIcon className='icon' />
                </div>
                Запланировать расходы
            </button>
            { Object.entries(plan)
                .map(([sectionID, expenses]) => (
                    <ExpenseSection sectionID={sectionID} expenses={expenses} filterType={filterType}/>
                ))
            }
        </>
    )
}