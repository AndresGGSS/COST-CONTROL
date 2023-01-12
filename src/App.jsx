import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import { generateId } from './Helpers'
import Listexpense from './components/Listexpense'
import Filters from './components/Filters'

function App() {

const [budget, setBudget] = useState(Number(localStorage.getItem('budget')) ?? 0)
const [validBudget, setValidBudget] = useState(false)
const [modal, setModal] = useState(false)
const [animationModal, setAnimationModal] = useState(false)
const [expenses, setExpenses] = useState(localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [])
const [expenseEdit, setExpenseEdit] = useState({})
const [filter, setFilter] = useState ('')
const [filteredexpenses, setFilteredExpenses] = useState([])

useEffect(() => {
  if( Object.keys(expenseEdit).length > 0 ) {
    setModal(true)

    setTimeout(() => {
        setAnimationModal(true)
    }, 500);
}
}, [expenseEdit])

useEffect(() => {
  localStorage.setItem('budget', budget ?? 0)
}, [budget])

useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
}, [expenses])

useEffect(() =>{
  if (filter) {
    const filteredExpenses = expenses.filter( expense => expense.category === filter)
    setFilteredExpenses(filteredExpenses)
  }
},[filter])

useEffect(() => {
  const budgetLs = Number(localStorage.getItem('budget')) ?? 0;
  if (budgetLs > 0) {
    setValidBudget(true)
  }
}, [])

const handleNewExpense = () => {
  setModal(true)
  setExpenseEdit({})

  setTimeout(() => {
    setAnimationModal(true)
  }, 500);
}

const saveExpense = expense => {
  if (expense.id) {
    const updatedExpenses = expenses.map( expenseState => expenseState.id === expense.id ? expense : expenseState)
    setExpenses(updatedExpenses)
    setExpenseEdit({})
  } else{
    expense.id = generateId();
    expense.date = Date.now();
    setExpenses([...expenses, expense ])
  }
  setAnimationModal(false)
  setTimeout(() => {
      setModal(false)
  }, 500); 
}

const deleteExpense = id => {
  const updatedExpenses = expenses.filter( expense => expense.id !== id)
  setExpenses(updatedExpenses)
}

  return (
    <div className={modal ? 'fijar' : '' }>
      <Header
       expenses={expenses}
       setExpenses={setExpenses}
       budget={budget}
       setBudget={setBudget}
       validBudget={validBudget}
       setValidBudget={setValidBudget}
      />
      {validBudget && (
        <>
        <main>
          <Filters
          filter={filter}
          setFilter={setFilter}
          ></Filters>
          <Listexpense
          expenses={expenses}
          setExpenseEdit={setExpenseEdit}
          deleteExpense={deleteExpense}
          filter={filter}
          filteredexpenses={filteredexpenses}
          />
        </main>
           <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo Gasto"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal && <Modal 
      setModal={setModal} 
      animationModal={animationModal} 
      setAnimationModal={setAnimationModal}
      saveExpense={saveExpense}
      expenseEdit={expenseEdit}
      setExpenseEdit={setExpenseEdit}
      />}

    </div>
  )
}

export default App
