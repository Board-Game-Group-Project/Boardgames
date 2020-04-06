import React from 'react'
import BlackPawn from '../ChessPieces/Black/BlackPawn/BlackPawn'
import BlackQueen from '../ChessPieces/Black/BlackQueen/BlackQueen'
import BlackKing from '../ChessPieces/Black/BlackKing/BlackKing'
import BlackBishop from '../ChessPieces/Black/BlackBishop/BlackBishop'
import BlackKnight from '../ChessPieces/Black/BlackKnight/BlackKnight'
import BlackRook from '../ChessPieces/Black/BlackRook/BlackRook'
import './Chess.css'
import WhitePawn from '../ChessPieces/White/WhitePawn/WhitePawn'
import WhiteRook from '../ChessPieces/White/WhiteRook/WhiteRook'
import WhiteKnight from '../ChessPieces/White/WhiteKnight/WhiteKnight'
import WhiteBishop from '../ChessPieces/White/WhiteBishop/WhiteBishop'
import WhiteKing from '../ChessPieces/White/WhiteKing/WhiteKing'
import WhiteQueen from '../ChessPieces/White/WhiteQueen/WhiteQueen'


function Chess(props) {

    var squares = []
    var color = 0

    //colored board with no pieces <-- also ensures that the empty spaces are the correct color
    for (let i = 0; i < 64; i++) {
        if (i % 16 === 0) {
            squares.push(<div key={i+100} className='square'>{i}</div>)
            color = 0
        } else if (i % 8 === 0) {
            squares.push(<div key={i+100} className='square2'>{i}</div>)
            color = 1
        } else if (color === 1) {
            squares.push(<div key={i+100} className='square'>{i}</div>)
            color = 0
        } else {
            squares.push(<div key={i+100} className='square2'>{i}</div>)
            color = 1
        }
    }

    // base board layout with pieces
    //black
    squares[0] = <div key={1} className='square'><BlackRook /></div>
    squares[1] = <div key={2} className='square2'><BlackKnight /></div>
    squares[2] = <div key={3} className='square'><BlackBishop /></div>
    squares[3] = <div key={4} className='square2'><BlackQueen /></div>
    squares[4] = <div key={5} className='square'><BlackKing /></div>
    squares[5] = <div key={6} className='square2'><BlackBishop /></div>
    squares[6] = <div key={7} className='square'><BlackKnight /></div>
    squares[7] = <div key={8} className='square2'><BlackRook /></div>
    squares[8] = <div key={9} className='square2'><BlackPawn /></div>
    squares[9] = <div key={10} className='square'><BlackPawn /></div>
    squares[10] = <div key={11} className='square2'><BlackPawn /></div>
    squares[11] = <div key={12} className='square'><BlackPawn /></div>
    squares[12] = <div key={13} className='square2'><BlackPawn /></div>
    squares[13] = <div key={14} className='square'><BlackPawn /></div>
    squares[14] = <div key={15} className='square2'><BlackPawn /></div>
    squares[15] = <div key={16} className='square'><BlackPawn /></div>

    //white
    squares[48] = <div key={17} className='square'><WhitePawn /></div>
    squares[49] = <div key={18} className='square2'><WhitePawn /></div>
    squares[50] = <div key={19} className='square'><WhitePawn /></div>
    squares[51] = <div key={20} className='square2'><WhitePawn /></div>
    squares[52] = <div key={21} className='square'><WhitePawn /></div>
    squares[53] = <div key={22} className='square2'><WhitePawn /></div>
    squares[54] = <div key={23} className='square'><WhitePawn /></div>
    squares[55] = <div key={24} className='square2'><WhitePawn /></div>
    squares[56] = <div key={25} className='square2'><WhiteRook /></div>
    squares[57] = <div key={26} className='square'><WhiteKnight /></div>
    squares[58] = <div key={27} className='square2'><WhiteBishop /></div>
    squares[59] = <div key={28} className='square'><WhiteQueen /></div>
    squares[60] = <div key={29} className='square2'><WhiteKing /></div>
    squares[61] = <div key={30} className='square'><WhiteBishop /></div>
    squares[62] = <div key={31} className='square2'><WhiteKnight /></div>
    squares[63] = <div key={32} className='square'><WhiteRook /></div>


    //logic goes under here


    return (
        <div className='chess-board'>
            {squares}
        </div>
    )
}

export default Chess
