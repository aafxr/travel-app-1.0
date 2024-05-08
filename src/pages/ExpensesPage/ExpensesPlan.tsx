import {useLocation, useNavigate} from "react-router-dom";

import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import {SortedExpensesType} from "../../hooks";
import {PlusIcon} from "../../components/svg";
import Loader from "../../components/Loader/Loader";
import {useExpensesPlanSorted} from "../../hooks/redux-hooks";

type ExpensesPlanPropsType = {
    filterType: ExpenseFilterType
}


export function ExpensesPlan({filterType}: ExpensesPlanPropsType){
    const location = useLocation()
    const navigate = useNavigate()
    const {sortedExpenses, loading, error} = useExpensesPlanSorted()


    const  handleAddExpense = () => navigate(location.pathname + 'add/')

    if (loading)
        return <div className='h-full center'><Loader/></div>

    if (error)
        return <div className='h-full center'>{error}</div>

    return (
        <>
            <button className='expense-btn' onClick={handleAddExpense}>
                <div className='expense-btn-icon'>
                    <PlusIcon className='icon' />
                </div>
                Запланировать расходы
            </button>
            { Object.entries(sortedExpenses)
                .map(([sectionID, expenses]) => (
                    <ExpenseSection sectionID={sectionID} expenses={expenses} filterType={filterType}/>
                ))
            }
        </>
    )
}