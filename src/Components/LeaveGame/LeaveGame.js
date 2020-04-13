import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';

function LeaveGame (props){
    const [state, setState] = useState({
        endpoint: "http://localhost:4420",
      });

    const [socket, setSocket] = useState(io(state.endpoint));
    const [confirm, setConfirm] = useState(false);

    let leaveGame = () => {
        setConfirm(true)
    }
    let confirmLeave = () => {
        socket.emit('leaveGame')
    }
    let cancelLeaveGame = () => {
        setConfirm(false)
    }

    return(
        <div>
            <p>Leave Game</p>
            {confirm === false ? (
            <button onClick={leaveGame}>Leave Game</button>
            ):(
                <div>
                    <p>Are you sure?</p>
                    <button onClick={confirmLeave}>Confirm</button>
                    <button onClick={cancelLeaveGame}>Cancel</button>
                </div>
            )}
        </div>
    )

}

export default withRouter(LeaveGame)