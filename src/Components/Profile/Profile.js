import React, {useState} from "react";
import { connect } from "react-redux";
import { login, deletePlayer, editPlayer } from "../../ducks/playerReducer";
import Socket from '../Socket/Socket'
import LeaveGame from '../LeaveGame/LeaveGame'
import './Profile.css'

function Profile (props) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [username, setUsername] = useState(props.player.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(props.player.email);

  const { player_id } = props.player
  return (
    <div className="profile">
      <div
        className="player-info"
      >
        <h1 className='profile-info'>
          <span>USERNAME: {username}</span>
          <span>EMAIL: {email}</span>
        </h1>
        <div className='profile-card'>
          <div className="editing-card">
            {
              (editing === false) ? (
                <div>
                  <button
                    className='profile-button'
                    onClick={() => setEditing(true)}
                  >
                    EDIT ACCOUNT
                  </button>
                </div>
              ):(
                <form
                  className='profile-form'
                  onSubmit={ async (e) => {
                    e.preventDefault()
                    await props.editPlayer(player_id, username, email)
                    setEditing(false)
                  }}
                >
                  <input 
                    className='profile-input'
                    type="text"
                    value={username}
                    placeholder="enter a username"
                    onChange={e => setUsername(e.target.value)}
                  ></input>
                  <input 
                    className='profile-input'
                    type="email" 
                    value={email} 
                    placeholder="enter your email" 
                    onChange={e => setEmail(e.target.value)}
                  ></input>
                  <button
                    className='profile-button'
                    type="submit"
                  >
                    SAVE CHANGES
                  </button>
                  <button
                    className='profile-button'
                    onClick={() => setEditing(false)}
                  >
                    CANCEL
                  </button>
                </form>
              )
            }
          </div>
          <div className="deleting-card">
            {
              (deleting === false) ? (
                <div>
                  <button
                    className='profile-button'
                    onClick={() => setDeleting(true)}
                  >
                    DELETE ACCOUNT
                  </button>
                </div>
              ):(
                <form
                  className='profile-form'
                  onSubmit={ async (e) => {
                    e.preventDefault()
                    await props.deletePlayer(player_id, username, password)
                  }}
                >
                  <input 
                    className='profile-input'
                    type="text"
                    value={username}
                    placeholder="enter your username"
                    onChange={e => setUsername(e.target.value)}
                  ></input>
                  <input 
                    className='profile-input'
                    type="password" 
                    value={password} 
                    placeholder="enter your password" 
                    onChange={e => setPassword(e.target.value)}
                  ></input>
                  <button
                    className='profile-button'
                    type="submit"
                  >
                    DELETE ACCOUNT
                  </button>
                  <button
                    className='profile-button'
                    onClick={() => setDeleting(false)}
                  >
                    CANCEL
                  </button>
                </form>
              )
            }
          </div>
        </div>
      </div>
      <Socket/>
      <LeaveGame/>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    player: reduxState.playerReducer.player,

  };
};

const mapDispatchToProps = {
  login,
  editPlayer,
  deletePlayer,
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);