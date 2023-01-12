import { useState, useEffect } from 'react'
import Message from './Message'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animationModal, setAnimationModal, saveExpense, expenseEdit, setExpenseEdit}) => {

    const [messages, setMessages] = useState("")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const[id, setId] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        if( Object.keys(expenseEdit).length > 0 ) {
            setName(expenseEdit.name)
            setAmount(expenseEdit.amount)
            setCategory(expenseEdit.category)}
            setId(expenseEdit.id)
            setDate(expenseEdit.date)
    }, [])

    const handleModal = () => {
        setAnimationModal(false)
        setExpenseEdit({})
        setTimeout(() => {
            setModal(false)
        }, 500); 
    }
    const handleForm = (e) => {
        e.preventDefault();
        if ([ name, category ].includes("") || amount <= 0){
            setMessages('Todos los campos son obligatorios')
            setTimeout(() => {
                setMessages("")
            }, 3000);
            return
        }
        saveExpense({name, amount, category, id, date})
    }
    return (
        <div className="modal">

            <div className="cerrar-modal">
                <img
                src={CerrarBtn}
                alt="cerrar modal"
                onClick={handleModal}
                />
            </div>

            <form onSubmit={handleForm} className={`formulario ${animationModal ? "animar" :  "cerrar"}`}>

                <legend>{expenseEdit.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {messages && <Message tipo="error"> {messages} </Message> }

                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                    type="text" 
                    placeholder='Añade el nombre del gasto'
                    id="nombre"
                    value={name}
                    onChange={ e => setName(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                    type="number" 
                    placeholder='Añade un montó'
                    id="cantidad"
                    value={amount}
                    onChange={ e => setAmount(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    <select 
                    id="categoria"
                    value={category}
                    onChange={ e => setCategory(e.target.value)}
                    >
                        <option value="">-- Seleccine --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={expenseEdit.name ? "Guardar Cambios" : "Añadir Gasto"}/>

            </form>
        </div>
    );
}
 
export default Modal