import { useState,useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const BudgetControl = ({budget, setBudget, expenses, setExpenses, setValidBudget}) => {

    const[available, setAvailable] = useState(0)
    const[spent, setSpent] = useState(0)
    const[percentage, setPercentage] = useState(0)

    useEffect(() => {
        const totalSpent = expenses.reduce((total, spend) => spend.amount + total, 0)
        const totalAvaible = budget - totalSpent
        const newPercentage = (((budget - totalAvaible) / budget) * 100).toFixed(2)
        setAvailable(totalAvaible)
        setSpent(totalSpent)
        setTimeout(() => {
            setPercentage(newPercentage)
        }, 1500);
    },[expenses])

    const convertnumber = amount => {
        return amount.toLocaleString('en-US',{
            style: 'currency',
            currency:'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm("¿Deseas reiniciar la app?")
        if (result) {
            setExpenses([])
            setBudget(0)
            setValidBudget(false)
            
        }
    }

    return ( 
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: percentage > 100 ? '#DC2626' : '#6f5ad9',
                    trailColor: '#F5F5F5',
                    textColor: percentage > 100 ? '#DC2626' : '#6f5ad9',
                })}
                value={percentage}
                text={`${percentage}% Gastado`}
                ></CircularProgressbar>
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>Resetear App</button>
                <p>
                    <span>Presupuesto:</span> {convertnumber(budget)}
                </p>
                <p className= {`${available < 0 ? 'negativo' : ''}`} >
                    <span>Disponible:</span> {convertnumber(available)}
                </p>
                <p>
                    <span>Gastado:</span> {convertnumber(spent)}
                </p>
            </div>
        </div>
     );
}
 
export default BudgetControl