import {useLocation, useNavigate} from "react-router-dom";

import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import {SortedExpensesType} from "../../hooks";
import {PlusIcon} from "../../components/svg";

type ExpensesActualPropsType = {
    actual: SortedExpensesType['actual']
    filterType: ExpenseFilterType
}


export function ExpensesActual({actual, filterType}: ExpensesActualPropsType){
    const location = useLocation()
    const navigate = useNavigate()


    const  handleAddExpense = () => navigate(location.pathname + 'add/')

    return (
        <>
            <button className='expense-btn' onClick={handleAddExpense}>
                <div className='expense-btn-icon'>
                    <PlusIcon className='icon'/>
                </div>
                Записать расходы
            </button>
            {Object.entries(actual)
                .map(([sectionID, expenses]) => (
                    <ExpenseSection key={sectionID} sectionID={sectionID} expenses={expenses} filterType={filterType}/>
                ))
            }
        </>
    )
}