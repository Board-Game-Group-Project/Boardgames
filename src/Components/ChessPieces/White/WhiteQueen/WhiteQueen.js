import React from 'react'
import Queen from './white_queen.png'
import '../../ChessPieces.css'

function WhiteQueen(props) {
    return (
        <img className='chess-pieces' src={Queen} />
    )
}

export default WhiteQueen