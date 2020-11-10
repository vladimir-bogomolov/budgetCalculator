import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import {v4 as uuid} from 'uuid';

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  const result = useState(initialExpenses);
  const expenses = result[0];
  const setExpenses = result[1];
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show: false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false});
    }, 3000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0) {
      if(edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        setId(0);
        handleAlert({type: 'success', text: 'Item edited'});
      } else {
        const singleExpens = {id: uuid(), charge, amount};
        setExpenses([...expenses, singleExpens]);
      }
      setCharge('');
      setAmount('');
      handleAlert({type: 'success', text: 'Item added'});
    } else {
      handleAlert({type: 'danger', text: `Charge can't be empty, amount has to be bigger 0`});
    }
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({type: 'danger', text: 'Items deleted'});

  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => {
      return item.id !== id;
    });
    setExpenses(tempExpenses);
    handleAlert({type: 'danger', text: 'Item deleted'});
  };

  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setEdit(true);
    setId(id);
  };
  
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
    
    <h1>Budget Calculator</h1>
    <main className='App'>
      <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit}/>
      <ExpenseList expenses = {expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems} edit={edit}/>
    </main>
  <h1>Total: <span className='total'>${expenses.reduce((acc, curr) => {
    return acc += parseInt(curr.amount);
  }, 0)}</span></h1>
    </>
  );
}

export default App;
