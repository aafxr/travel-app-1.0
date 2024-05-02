import {SortedExpensesType} from "../../hooks";
import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";
import {PlusIcon} from "../../components/svg";

type ExpensesPlanPropsType = {
    plan: SortedExpensesType['plan']
}


export function ExpensesPlan({plan}: ExpensesPlanPropsType){
    return (
        <>
            <button className='expense-btn'>
                <div className='expense-btn-icon'>
                    <PlusIcon className='icon' />
                </div>
                Запланировать расходы
            </button>
            { Object.entries(plan)
                .map(([sectionID, expenses]) => (
                    <ExpenseSection sectionID={sectionID} expenses={expenses} />
                ))
            }
        </>
    )
}