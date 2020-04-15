import React, { Component } from 'react';
import io from 'socket.io-client'; 
import './TicTacToe.css'

function Block(props) {
    return (
        <button className="block" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            myTurn:null,
            socket:io("http://localhost:4420"),
            socketConnect:false,
            inQueue:false,
            char:'',
        }
    }
    componentDidMount(){
        let socket = this.state.socket
        socket.emit('join');
    }



    handleClick(i) {
        if(this.state.myTurn === true){
            const squares = this.state.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.char;
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
            });
            this.setState({myTurn:false})
            if(this.state.nameSpaceSet === false){
                this.setState({nameSpaceSet:true})
            }
        }
    }
    

    renderSquare(i) {
        return (
            <Block
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        let socket = this.state.socket
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let queue = () => {
            this.setState({inQueue:!this.state.inQueue})
        }

        socket.on('tttRoomJoined',() => {
            this.setState({socketConnect:true})
        })

        return (
            <>
            {this.state.socketConnect === false ? (
                <>
                {this.state.inQueue === false? (
                <div>
                    <h1>JOIN QUEUE</h1>
                    <button onClick={() => socket.emit('tttQueue',queue())}>Join Queue</button>
                </div>
                ):(
                    <div>
                        <h1>LEAVE QUEUE</h1>
                        <button onClick={() => socket.emit('leaveQueue',queue())}>Leave Queue</button>
                    </div>
                )}
                </>
            ):(
            <div>
                <div className="status">{status}</div>
                <p>You're player: {this.state.char}</p>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
            )}
            </>
        );
    }
}

class Game extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}



export default Game