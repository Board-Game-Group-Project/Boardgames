import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import Square from './Square';
import './TicTacToe.css';

function TicTacToe(props){
    const [ticTacToe,setTicTacToe] = [0,1,2,3,4,5,6,7,8,9];
    const [xOrO,setxOrO] = 'x';

   
    return(
    <div className='box'>
        <div className='tictactoeboard'>
            <div className='square'>
                <Square xOrO={xOrO}/>
                <Square xOrO={xOrO}/>
                <Square xOrO={xOrO}/>
            </div>
            <div className='square'>
                <Square xOrO={xOrO}/>
                <Square xOrO={xOrO}/>
                <Square xOrO={xOrO}/>
            </div>
            <div className='square'>
                <Square xOrO={xOrO}/>
                <Square xOrO={xOrO}/>
                <Square xOrO={xOrO}/>
            </div>
        </div>
    </div>
    )



    
}
const mapStateToProps = reduxState => {
    return {
        player: reduxState.playerReducer.player
    };
};

export default connect(mapStateToProps)(TicTacToe);