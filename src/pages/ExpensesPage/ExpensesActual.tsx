import {SortedExpensesType} from "../../hooks";
import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";
import {PlusIcon} from "../../components/svg";

type ExpensesActualPropsType = {
    actual: SortedExpensesType['actual']
}


export function ExpensesActual({actual}: ExpensesActualPropsType){
    return (
        <>
            <button className='expense-btn'>
                <div className='expense-btn-icon'>
                    <PlusIcon className='icon'/>
                </div>
                Записать расходы
            </button>
            {Object.entries(actual)
                .map(([sectionID, expenses]) => (
                    <ExpenseSection sectionID={sectionID} expenses={expenses}/>
                ))
            }
        </>
    )
}