import React from 'react'
import Knight from './white_knight.png'
import '../../ChessPieces.css'

function WhiteKnight(props) {
    return (
        <img className='chess-pieces' src={Knight} />
    )
}

export default WhiteKnight