import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux'
import Square from './Square'

function TicTacToe(props){
    const [ticTacToe,setTicTacToe] = [0,1,2,3,4,5,6,7,8,9];
    const [xOrO,setxOrO] = 'x';

   
    return(
    <>
    <div>
    <Square xOrO={xOrO}/>
    <Square xOrO={xOrO}/>
    <Square xOrO={xOrO}/>
    </div>
    <div>
    <Square xOrO={xOrO}/>
    <Square xOrO={xOrO}/>
    <Square xOrO={xOrO}/>
    </div>
    <div>
    <Square xOrO={xOrO}/>
    <Square xOrO={xOrO}/>
    <Square xOrO={xOrO}/>
    </div>
    </>
    )



    
}
const mapStateToProps = reduxState => {
    return {
        player: reduxState.playerReducer.player
    };
};

export default connect(mapStateToProps)(TicTacToe);