import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter, Redirect } from 'react-router-dom'
import { login, register } from "../../ducks/playerReducer"
import './Landing.css'


function Landing (props) {
  const [registered, setRegistered] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  

  const login = async () => {
    await props.login(username, password)
    if (props.player) {
      props.history.push(`/profile`)
    }
  }
  
  if (props.player.username && props.location.pathname === "/") {
    return <Redirect to="/profile" />
  }

  return (
    <div className="landing">
      <div
        className="website-info"
      >
        <p
          className='greeting'
        >
          Battle others in a game of chess!
          Login to continue.
        </p>
      </div>
      {registered ? (
        <div className='login-card'>
          <form
            className='landing-form'
            onSubmit={e => {
              e.preventDefault()
              login()
            }}
          >
            <input 
              className='landing-input'
              type="text"
              value={username}
              placeholder="enter your username"
              onChange={e => setUsername(e.target.value)}
            ></input>
            <input 
              className='landing-input'
              type="password"
              value={password}
              placeholder="enter your password"
              onChange={e => setPassword(e.target.value)}
            ></input>
            <button
              className='landing-button'
            >
              LOGIN
            </button>
            <p>
              Don't have an account?
            </p>
            <span 
              className='toggler'
              style={{color: "rgba(58,87,124,1)"}}
              onClick={e => setRegistered(false)}
            >
              Click here to register.
            </span>
          </form>
        </div>
      ) : (
        <div
          className='register-card'
        >
          <form
            className='landing-form'
            onSubmit={e => {
              e.preventDefault()
              props.register(username, email, password)
            }}
          >
            <input 
              className='landing-input'
              type="text"
              value={username}
              placeholder="enter a username"
              onChange={e => setUsername(e.target.value)}
            ></input>
            <input 
              className='landing-input'
              type="email" 
              value={email} 
              placeholder="enter an email" 
              onChange={e => setEmail(e.target.value)}
            ></input>
            <input 
              className='landing-input'
              type="password" 
              value={password} 
              placeholder="enter a password" 
              onChange={e => setPassword(e.target.value)}
            ></input>
            <button
              className='landing-button'
            >
              REGISTER
            </button>
            <p>
              Already have an account? 
            </p>
            <span 
              className='toggler'
              style={{color: "rgba(58,87,124,1)"}} 
              onClick={e => setRegistered(true)}
            >
              Click here to sign in.
            </span>
          </form>
        </div>
      )}
      
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    player: reduxState.playerReducer.player
  };
};

const mapDispatchToProps = {
  login,
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing))