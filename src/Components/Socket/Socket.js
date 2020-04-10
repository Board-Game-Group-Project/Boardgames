import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';

function Socket (props) {
    const [rooms, setRooms] = useState([])
    const [user, setUser] = useState('')
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
      
      console.log(user)

    return(
        <div className="sockets-card" >
          <h1>
            JOIN A GAME
          </h1>
          <input 
            className='profile-input'
            placeholder='Room Name'
          ></input>
          <button 
            className="profile-button"
            onClick={() => socket.emit('queue', console.log(socket.id))}
          >
            Join Queue
          </button>
          <button 
            className="profile-button"
            onClick={() => socket.emit('disconnect',console.log('hit disconnect')),() => {setRooms('')}}
          >
            Leave Room
          </button>
        </div>
    )
}

export default withRouter(Socket)