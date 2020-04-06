import React from 'react'
import Rook from './black_rook.png'
import '../../ChessPieces.css'

function BlackRook(props) {
    return (
        <img className='chess-pieces' src={Rook} />
    )
}

export default BlackRook