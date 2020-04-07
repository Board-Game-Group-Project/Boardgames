import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

let socket;


function Socket (props) {
    const [rooms, setRooms] = useState([])
    const [user, setUser] = useState([{name:''}])
    
    useEffect(() => {
        socket = io('localhost:4420')
        socket.emit('join',setUser({name:`${socket.id}`}))
        
        console.log(user)
      }, ['localhost:4420'])

     


    

    return(
        <>
        <div>Sockets</div>
        <input placeholder='Room Name'></input>
        <button onClick={() => socket.emit('queue', console.log(socket.id))}>Join Queue</button>
        <button onClick={() => socket.emit('disconnect',console.log('hit disconnect')),() => {setRooms('')}}>Leave Room</button>
        </>
    )
}

export default withRouter(Socket)