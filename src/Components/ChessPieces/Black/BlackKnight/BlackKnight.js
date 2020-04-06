import React from 'react'
import Knight from './black_knight.png'
import '../../ChessPieces.css'

function BlackKnight(props) {
    return (
        <img className='blackKnight' src={Knight} />
    )
}

export default BlackKnight