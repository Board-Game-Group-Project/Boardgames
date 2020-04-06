import React from "react";
import { withRouter, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { logout } from "../../ducks/playerReducer";
import './Header.css'

function Header (props) {

  return (
    <div className="header">
      <div className='header-buttons'>
        <div
          className='nav-buttons'
        >
          {Object.keys(props.player).length === 0 ? (
            null
          ):(
          <>
          <Link 
            to='/profile'
            className='nav-button'
            >
            PROFILE
          </Link>
          <Link 
            to='/chess'
            className='nav-button'
            >
            CHESS
          </Link>
          <Link 
            to='/scoreboard'
            className='nav-button'
            >
            SCORES
          </Link>
          </>
          )}
        </div>
        <h1 className='website-name'>
          SEXY BOARDGAMES
        </h1>
        {Object.keys(props.player).length === 0 ?(
          null
        ):(
        <h2
            className='logout'
            onClick={() => {
              props.logout()
              props.history.push(`/`)
            }}
          >
          LOGOUT
        </h2>
        )}
      </div>
    </div>
  )
}
const mapStateToProps = reduxState =>{
  return{
      player:reduxState.playerReducer.player,
  }
}

export default connect(mapStateToProps, {logout})(withRouter(Header));