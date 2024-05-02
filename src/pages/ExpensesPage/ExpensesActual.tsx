import {SortedExpensesType} from "../../hooks";
import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";

type ExpensesActualPropsType = {
    actual: SortedExpensesType['actual']
}


export function ExpensesActual({actual}: ExpensesActualPropsType){
    return (
        <>
            { Object.entries(actual)
                .map(([sectionID, expenses]) => (
                    <ExpenseSection sectionID={sectionID} expenses={expenses} />
                ))
            }
        </>
    )
}