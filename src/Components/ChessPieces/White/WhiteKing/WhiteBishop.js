import React from 'react'
import Bishop from './white_bishop.png'
import '../../ChessPieces.css'

function WhiteBishop(props) {
    return (
        <img className='whiteBishop' src={Bishop} />
    )
}

export default WhiteBishop