import React from 'react';
import routes from './routes'
import { withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {checkPlayer} from './ducks/playerReducer'
import Header from './Components/Header/Header'
import Errors from './Components/Errors'
import './App.css'

class App extends React.Component {

  componentDidMount() {
    this.props.checkPlayer()
  }

  render() {
    if (!this.props.player.username && this.props.location.pathname !== "/") {
      return <Redirect to="/" />
    }

    return (
      <div className={`App`}>
        <Header />
        {routes}
        <Errors />
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  return {
    player: reduxState.playerReducer.player
  }
}

export default connect(mapStateToProps, {checkPlayer})(withRouter(App))
