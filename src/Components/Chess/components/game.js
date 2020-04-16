import React from 'react';
import King from '../pieces/king'

import '../Chess.css'
import Board from './board.js';
import initialiseChessBoard from '../helpers/board-initialiser.js';
import io from 'socket.io-client'

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      player: 1,
      sourceSelection: -1,
      status: '',
      victory: 'test',
      turn: false,
      turnInfo:'White',
      socket: io("http://localhost:4420"),
      socketConnect: false,
      inQueue: false,
      room: null,
      kingDead:false,
    }
  }

  componentDidMount() {
    let socket = this.state.socket
    socket.emit('join');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.kingDead !== this.state.kingDead) {
      this.isKingDead()
    }
    if (this.state.victory === 'We have a winner') {

    }
  }
  
  isKingDead() {
    let kingCount = 0
    for (let i = 0; i < this.state.squares.length; i++) {
      if (this.state.squares[i] !== null) {

        if (this.state.squares[i].type === 'King') {
          kingCount++
        }
      }
    }
    if (kingCount < 2) {
      if (this.state.player === 1) {
        this.setState({
          victory: 'We have a winner',
          status: 'Black wins!'
        })

      } else if (this.state.player === 2) {
        this.setState({
          victory: 'We have a winner',
          status: 'White wins!'
        })

      }
    }
  }

  handleClick(i) {
    
    
    if (this.state.victory === 'test') {
      if(this.state.turn === true){
      const squares = this.state.squares.slice();
      

      if (this.state.sourceSelection === -1) {
        if (!squares[i] || squares[i].player !== this.state.player) {
          this.setState({ status: "Wrong selection. Choose player " + this.state.player + " pieces." });
          if (squares[i]) {
            squares[i].style = { ...squares[i].style, backgroundColor: "" };
          }
        }
        else {
          squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" };
          this.setState({
            status: "Choose destination for the selected piece",
            sourceSelection: i
          });
        }
      }

      else if (this.state.sourceSelection > -1) {
        squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: "" };
        if (squares[i] && squares[i].player === this.state.player) {
          this.setState({
            status: "Wrong selection. Choose valid source and destination again.",
            sourceSelection: -1,
          });
        }
        else {

          const squares = this.state.squares.slice();
          const isDestEnemyOccupied = squares[i] ? true : false;
          const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
          const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
          const isMoveLegal = this.isMoveLegal(srcToDestPath);


          if (isMovePossible && isMoveLegal) {
            if (squares[i] !== null) {

            }
            squares[i] = squares[this.state.sourceSelection];
            squares[this.state.sourceSelection] = null;
            // let player = this.state.player === 1 ? 2 : 1;
            let turn = !this.state.turn
            this.setState({
              sourceSelection: -1,
              squares: squares,
              // player: player,
              status: '',
              turn: turn,
              kingDead:!this.state.kingDead
            });
            if(this.state.turnInfo === 'White'){
              this.setState({turnInfo:'Black'})
            }else{
              this.setState({turnInfo:'White'})
            }
            console.log(this.state.room)

            this.state.socket.emit('chessNextTurn',this.state.room,this.state.board)

            this.isKingDead()
          }
        
          else {
            this.setState({
              status: "Wrong selection. Choose valid source and destination again.",
              sourceSelection: -1,
            });
          }
        }
      }
    }else{
      this.setState({status:"It's not your turn!"})
    }
    } else { this.setState({ status: 'The game is already won' }) }

  }

  


  isMoveLegal(srcToDestPath) {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  }



  render() {
    let socket = this.state.socket
    let queue = () => {
      this.setState({ inQueue: !this.state.inQueue })
    }
    socket.on('roomJoined', (room) => {
      this.setState({ socketConnect: true, room: room })
      socket.emit('chessSetPlayers',this.state.room)
    })
    socket.on('roomJoinedOpponent', (room) => {
      this.setState({socketConnect:true,room:room})
    })
    socket.on('setWhite',() => {
      this.setState({player:1,turn:true})
    })
    socket.on('setBlack', () => {
      this.setState({player:2,turn:false})
    })
    socket.on('chessUpdateInfo', (newBoard) => {
      this.setState({turn:true})
      if(this.state.turnInfo === 'White'){
        this.setState({turnInfo:'Black'})
      }else{
        this.setState({turnInfo:'White'})
      }
      console.log('hit')
    })
    return (
      <>
        {this.state.socketConnect === false ? (
          <>
            {this.state.inQueue === false ? (
              <div>
                <h1>JOIN QUEUE</h1>
                <button onClick={() => this.state.socket.emit('chessQueue', queue())}>Join Queue</button>
              </div>
            ) : (
                <div>
                  <h1>LEAVE QUEUE</h1>
                  <button onClick={() => this.state.socket.emit('leaveQueue', queue())}>Leave Queue</button>
                </div>
              )}
          </>
        ) : (
          <>
          <p>Player:{this.state.player}</p>
          <p>Turn:{this.state.turnInfo}</p>
            <div style={{ marginLeft: '400px', marginTop: '100px' }}>
              <div className="game">
                <div className="game-board">
                  <Board
                    squares={this.state.squares}
                    onClick={(i) => this.handleClick(i)}
                  />
                </div>
                <div className="game-info">
                  <h3>Turn</h3>
                  <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}>

                  </div>
                  <div className="game-status">{this.state.status}</div>
                </div>
              </div>
            </div>
          </>
          )}
            <button onClick={() => console.log(this.state.player)}>TEST</button>
      </>


    );
  }
}

