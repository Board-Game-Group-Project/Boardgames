import React from 'react';
import King from '../pieces/king'

import '../Chess.css'
import Board from './board.js';
import initialiseChessBoard from '../helpers/board-initialiser.js';
import io from 'socket.io-client'
import Bishop from '../pieces/bishop'
import Knight from '../pieces/knight'
import Pawn from '../pieces/pawn'
import Queen from '../pieces/queen'
import Rook from '../pieces/rook'

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      player: 1,
      playerColor: '',
      sourceSelection: -1,
      status: '',
      victory: 'test',
      turn: false,
      turnInfo: 'White',
      socket: io("http://localhost:4420"),
      socketConnect: false,
      inQueue: false,
      room: null,
      kingDead: false,
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
      if (this.state.playerColor === 'Black') {
        let winner = 'Black wins!'
        let victory = 'We have a winner'
        this.setState({
          victory: victory,
          status: winner
        })
        this.state.socket.emit('chessEndGame', this.state.room, victory, winner)

      } else if (this.state.playerColor === 'White') {
        let winner = 'White wins!'
        let victory = 'We have a winner'
        this.setState({
          victory: victory,
          status: winner
        })
        this.state.socket.emit('chessEndGame', this.state.room, victory, winner)
      }
    }
  }


  handleClick(i) {


    if (this.state.victory === 'test') {
      if (this.state.turn === true) {
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
                kingDead: !this.state.kingDead
              });
              let turnInfo = this.state.turnInfo === 'White' ? 'Black' : 'White';
              this.setState({ turnInfo: turnInfo })

              this.state.socket.emit('chessNextTurn', this.state.room, squares, turnInfo, this.state.victory)

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
      } else {
        this.setState({ status: "It's not your turn!" })
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



  render(props) {
    let socket = this.state.socket
    let queue = () => {
      this.setState({ inQueue: !this.state.inQueue })
    }
    socket.on('roomJoined', (room) => {
      this.setState({ socketConnect: true, room: room })
      socket.emit('chessSetPlayers', this.state.room)
    })
    socket.on('roomJoinedOpponent', (room) => {
      this.setState({ socketConnect: true, room: room })
    })
    socket.on('setWhite', () => {
      this.setState({ player: 1, playerColor: 'White', turn: true })
    })
    socket.on('setBlack', () => {
      this.setState({ player: 2, playerColor: 'Black', turn: false })
    })
    socket.on('chessUpdateInfo', (newBoard, turnInfo) => {
      let updatedBoard = newBoard.map((e) => {
        if (e !== null) {
          if (e.type === "King") {
            return new King(e.player)
          } else if (e.type === "Bishop") {
            return new Bishop(e.player)
          } else if (e.type === "Knight") {
            return new Knight(e.player)
          } else if (e.type === "Pawn") {
            return new Pawn(e.player)
          } else if (e.type === "Queen") {
            return new Queen(e.player)
          } else if (e.type === "Rook") {
            return new Rook(e.player)
          } else return null;
        } else return null
      })

      this.setState({ turn: true, turnInfo: turnInfo, squares: updatedBoard })
      console.log(updatedBoard[0])

    })
    socket.on('chessFinish', (victory, winner) => {
      this.setState({ victory: victory, status: winner })
    })
    return (
      <>
        {this.state.socketConnect === false ? (
          <>
            {this.state.inQueue === false ? (
              <div>
                <h1 style={{ color: 'white' }}>JOIN QUEUE</h1>
                <button onClick={() => this.state.socket.emit('chessQueue', queue())}>Join Queue</button>
              </div>
            ) : (
                <div>
                  <h1 style={{ color: 'white' }}>LEAVE QUEUE</h1>
                  <button onClick={() => this.state.socket.emit('leaveQueue', queue())}>Leave Queue</button>
                </div>
              )}
          </>
        ) : (
            <>
              <div style={{ marginLeft: '200px', marginTop: '100px' }}>
                <div className="game">
                  <div className="game-board">
                    <Board
                      squares={this.state.squares}
                      onClick={(i) => this.handleClick(i)}
                    />
                  </div>
                  <div className="game-info">
                    <p>Player:{this.state.playerColor}</p>
                    <p>Turn:{this.state.turnInfo}</p>
                    <div className="game-status">{this.state.status}</div>
                    {this.state.victory === 'test' ? (
                      null
                    ) : (
                        <button onClick={() => this.props.history.push('/profile')}>Exit Game</button>
                      )}
                  </div>
                </div>
              </div>
            </>
          )}
      </>


    );
  }
}

