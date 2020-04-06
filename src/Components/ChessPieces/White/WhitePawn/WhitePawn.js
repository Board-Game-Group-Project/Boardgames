import React from 'react'
import Pawn from './white_pawn.png'
import '../../ChessPieces.css'

function WhitePawn(props) {
    return (
        <img className='chess-pieces' src={Pawn} />
    )
}

export default WhitePawn