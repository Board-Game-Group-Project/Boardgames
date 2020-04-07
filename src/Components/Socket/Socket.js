import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import { withRouter } from 'react-router-dom';

let socket;


function Socket (props) {
    console.log(socket)
    const [rooms, setRooms] = useState([])
    
    useEffect(() => {
        socket = io('localhost:4420')
        socket.emit('join',console.log('Connected to IO Server'))
    
      }, ['localhost:4420'])

    return(
        <>
        <div>Sockets</div>
        <input placeholder='Room Name'></input>
        <button onClick={() => socket.emit('queue', console.log('hit'))}>Join Queue</button>
        <button onClick={() => socket.emit('disconnect',console.log('hit disconnect')),() => {setRooms('')}}>Leave Room</button>
        </>
    )
}

export default withRouter(Socket)