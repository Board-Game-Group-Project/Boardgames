import React from 'react'
import Rook from './white_rook.png'
import '../../ChessPieces.css'

function WhiteRook(props) {
    return (
        <img className='chess-pieces' src={Rook} />
    )
}

export default WhiteRook