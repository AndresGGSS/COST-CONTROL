import NewBudget from "./NewBudget";
import BudgetControl from "./BudgetControl";

const Header = ({ budget, setBudget, validBudget, setValidBudget, expenses, setExpenses}) => {
  return ( 
    <header>
      <h1>Planificación de Gastos</h1>

      {validBudget ?(
        <BudgetControl
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        setValidBudget={setValidBudget}
        />)
        : ( <NewBudget
          budget={budget}
          setBudget={setBudget}
          setValidBudget={setValidBudget}
          />)}
    </header>
   );
}
 
export default Header 