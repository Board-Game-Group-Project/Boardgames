import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';

function Socket (props) {
    const [rooms, setRooms] = useState([])
    const [user, setUser] = useState('')
    const [gameList,setGameList] = useState(false)
    const [selectedGame,setSelectedGame] = useState('Chess')
    const [state, setState] = useState({
        username: "",
        message: "",
        chat: [],
        endpoint: "http://localhost:4420",
      });
    
      const [socket, setSocket] = useState(io(state.endpoint));
    
      useEffect(() => {
        socket.on('connect', () => join())
        socket.emit('join',)
        console.log(user)
      }, [])

      let join = () => {
        setUser(socket.id)
      }
      let gameListButton = () => {
        setGameList(!gameList)
      }
      let chessGame = () => {
        setSelectedGame('Chess')
        let game = selectedGame
        socket.emit('selectedGame',game)
      }
      let checkersGame = () => {
        setSelectedGame('Checkers')
        let game = selectedGame
        socket.emit('selectedGame',game)
      }
      let tictactoeGame = () => {
        setSelectedGame('Tic-Tac-Toe')
        let game = selectedGame
        socket.emit('selectedGame',game)
      }

    return(
      <>
         <div className="sockets-card" >
          <h1>
            JOIN A GAME
          </h1>
          <div>
            <h1>{selectedGame}</h1>
            <button
              className="profile-button" 
              onClick={gameListButton}>
                Game List
          </button>
          {gameList === false? (
            null
          ):(
            <div>
              <button  className='gamelist-button' onClick={chessGame}>Chess</button>
              <button  className='gamelist-button' onClick={checkersGame}>Checkers</button>
              <button  className='gamelist-button' onClick={tictactoeGame}>Tic-Tac-Toe</button>
            </div>
          )}
          </div>
          <button 
            className="profile-button"
            onClick={() => socket.emit('queue', console.log(socket.id))}>
                Join Queue
          </button>
          <button 
            className="profile-button"
            onClick={() => socket.emit('disconnect',console.log('hit disconnect')),() => {setRooms('')}}>
               Leave Room
          </button>
        </div>
    </>     
    )
}

export default withRouter(Socket)