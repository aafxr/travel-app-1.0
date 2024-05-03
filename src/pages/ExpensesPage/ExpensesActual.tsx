import {useLocation, useNavigate} from "react-router-dom";

import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";
import {SortedExpensesType} from "../../hooks";
import {PlusIcon} from "../../components/svg";

type ExpensesActualPropsType = {
    actual: SortedExpensesType['actual']
}


export function ExpensesActual({actual}: ExpensesActualPropsType){
    const location = useLocation()
    const navigate = useNavigate()

    console.log(actual)


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
                    <ExpenseSection key={sectionID} sectionID={sectionID} expenses={expenses}/>
                ))
            }
        </>
    )
}