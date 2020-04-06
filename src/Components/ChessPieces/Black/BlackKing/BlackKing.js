import React from 'react'
import King from './black_king.png'
import '../../ChessPieces.css'

function BlackKing(props) {
    return (
        <img className='blackKing' src={King} />
    )
}

export default BlackKing