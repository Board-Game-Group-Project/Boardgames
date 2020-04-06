import React from 'react'
import King from './white_king.png'
import '../../ChessPieces.css'

function WhiteKing(props) {
    return (
        <img className='whiteKing' src={King} />
    )
}

export default WhiteKing