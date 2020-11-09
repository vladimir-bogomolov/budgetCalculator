import React, {useState} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import {v4 as uuid} from 'uuid';

const initialExpenses = [{id: uuid(), charge: 'rent', amount: 1600}, {id: uuid(), charge: 'car', amount: 400}, {id: uuid(), charge: 'credit cerd bill', amount: 1200}];

function App() {
  const result = useState(initialExpenses);
  const expenses = result[0];
  const setExpenses = result[1];

  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');

  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0) {
      const singleExpens = {id: uuid(), charge, amount};
      setExpenses([...expenses, singleExpens]);
      setCharge('');
      setAmount('');
    } else {
      // handle alert
    }
  };
  
  return (
    <>
    <Alert/>
    <h1>Budget Calculator</h1>
    <main className='App'>
      <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit}/>
      <ExpenseList expenses = {expenses}/>
    </main>
  <h1>Total: <span className='total'>${expenses.reduce((acc, curr) => {
    return acc += parseInt(curr.amount);
  }, 0)}</span></h1>
    </>
  );
}

export default App;
