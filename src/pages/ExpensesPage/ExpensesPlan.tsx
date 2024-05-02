import {SortedExpensesType} from "../../hooks";
import {ExpenseSection} from "../../components/ExpenseSection/ExpenseSection";

type ExpensesPlanPropsType = {
    plan: SortedExpensesType['plan']
}


export function ExpensesPlan({plan}: ExpensesPlanPropsType){
    return (
        <>
            { Object.entries(plan)
                .map(([sectionID, expenses]) => (
                    <ExpenseSection sectionID={sectionID} expenses={expenses} />
                ))
            }
        </>
    )
}