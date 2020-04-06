import React from 'react'
import Pawn from './black_pawn.png'
import '../../ChessPieces.css'

function BlackPawn(props) {
    return (
        <img className='chess-pieces' src={Pawn} />
    )
}

export default BlackPawn