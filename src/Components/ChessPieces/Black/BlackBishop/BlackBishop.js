import React from 'react'
import Bishop from './black_bishop.png'
import '../../ChessPieces.css'

function BlackBishop(props) {
    return (
        <img className='chess-pieces' src={Bishop} />
    )
}

export default BlackBishop