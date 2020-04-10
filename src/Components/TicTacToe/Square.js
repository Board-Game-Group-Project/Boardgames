import React, {useState,useEffect} from 'react'
import './Square.css';

export default function Square(props){
    const [value,setValue] = useState('');

    let squareValue = () => {
        setValue(props.xOrO)
    }

    return(
    <button className='tictactoesquare' onClick={() => squareValue()}>
        {value}
    </button>
    )}