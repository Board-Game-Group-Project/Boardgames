import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import { withRouter } from 'react-router-dom';

let socket;


function Socket (props) {
    console.log(socket)
    const [rooms, setRooms] = useState([])
    console.log(rooms)
    
    useEffect(() => {
        socket = io('localhost:4420')
        // socket.emit('join',console.log('hit'))
    
      }, ['localhost:4420'])

    return(
        <>
        <div>Sockets</div>
        <input placeholder='Room Name'></input>
        <button onClick={() => socket.emit('join', console.log('hit join')),() =>{setRooms(...rooms,`${socket.id}`)}}>Join Room</button>
        <button onClick={() => socket.emit('disconnect',console.log('hit disconnect')),() => {setRooms('')}}>Leave Room</button>
        </>
    )
}

export default withRouter(Socket)