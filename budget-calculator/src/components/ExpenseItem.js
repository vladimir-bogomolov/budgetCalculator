import React from 'react';
import {MdEdit, MdDelete} from 'react-icons/md'

export default function ExpenseItem({expense}) {
    const {id, charge, amount} = expense;
    return (
        <li className='item'>
            <div className='info'>
                <span className='expense'>{charge}</span>
                <spam className='amount'>${amount}</spam>
            </div>
            <div>
                <button className='edit-btn' aria-label='edit button'><MdEdit /></button>
                <button className='clear-btn' aria-label='delete button'><MdDelete /></button>
            </div>
        </li>
    )
}
