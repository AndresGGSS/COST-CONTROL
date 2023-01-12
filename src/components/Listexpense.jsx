import Expense from "./Expense";

const Listexpense = ({expenses, setExpenseEdit, deleteExpense, filter, filteredexpenses}) => {
    return (
        <div className="listado-gastos contenedor">

            {filter ? (
                <>
                <h2> {filteredexpenses.length ? 'Gastos' : 'No hay Gastos aún'} </h2>
                {filteredexpenses.map( expense => (
                    <Expense
                    key={expense.id}
                    expense={expense}
                    setExpenseEdit={setExpenseEdit}
                    deleteExpense={deleteExpense}
                    />
                ))}
                </>
                ) : (
                    <>
                    <h2> {expenses.length ? 'Gastos' : 'No hay Gastos aún'} </h2>
                    {expenses.map(expense => (
                        <Expense
                        key={expense.id}
                        expense={expense}
                        setExpenseEdit={setExpenseEdit}
                        deleteExpense={deleteExpense}
                        />
                    ))}
                    </>
                )
            }
        </div>
    );
}
 
export default Listexpense