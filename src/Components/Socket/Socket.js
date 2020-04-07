import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

let socket;


function Socket (props) {
    const [rooms, setRooms] = useState([])
    const [user, setUser] = useState('test')
    const [state, setState] = useState({
        username: "",
        message: "",
        chat: [],
        endpoint: "http://localhost:4420",
      });
    
      const [socket, setSocket] = useState(io(state.endpoint));
    
      useEffect(() => {
        socket.on('connect', () => join());

          socket.emit('join',)
          
          console.log(user)
        }, [])
        let join = () => {
        console.log(socket)
        setUser(socket.id)
      }
        console.log(user)
     


    

    return(
        <>
        <div>Sockets</div>
        <input placeholder='Room Name'></input>
        <button onClick={() => console.log(user)}></button>
        <button onClick={() => socket.emit('queue', console.log(socket.id))}>Join Queue</button>
        <button onClick={() => socket.emit('disconnect',console.log('hit disconnect')),() => {setRooms('')}}>Leave Room</button>
        </>
    )
}

export default withRouter(Socket)