import React, {useState,useEffect} from 'react'

export default function Square(props){
    const [value,setValue] = useState('');

    let squareValue = () => {
        setValue(props.xOrO)
    }

    return(
    <button onClick={() => squareValue()}>
        {value}
    </button>
    )}