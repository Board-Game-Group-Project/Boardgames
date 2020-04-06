import React from 'react'
import Queen from './black_queen.png'
import '../../ChessPieces.css'

function BlackQueen(props) {
    return (
        <img className='chess-pieces' src={Queen} />
    )
}

export default BlackQueen