import {useLocation, useNavigate} from "react-router-dom";

import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";
import {useLangContext} from "../../contexts/LangContextProvider";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import {useExpensesActualSorted} from "../../hooks/redux-hooks";
import Loader from "../../components/Loader/Loader";
import {PlusIcon} from "../../components/svg";

type ExpensesActualPropsType = {
    filterType: ExpenseFilterType
}


export function ExpensesActual({filterType}: ExpensesActualPropsType) {
    const lang = useLangContext()
    const location = useLocation()
    const navigate = useNavigate()
    const {sortedExpenses, loading, error} = useExpensesActualSorted()


    const handleAddExpense = () => navigate(location.pathname + 'add/')

    if (loading)
        return <div className='h-full center'><Loader/></div>

    if (error)
        return <div className='h-full center'>{error}</div>

    return (
        <>
            <button className='expense-btn' onClick={handleAddExpense}>
                <div className='expense-btn-icon'>
                    <PlusIcon className='icon'/>
                </div>
                {lang.recordExpenses}
            </button>
            {Object.entries(sortedExpenses)
                .map(([sectionID, expenses]) => (
                    <ExpenseSection key={sectionID} sectionID={sectionID} expenses={expenses} filterType={filterType}/>
                ))
            }
        </>
    )
}