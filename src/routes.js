import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Chess from './Components/Chess/components/game'
import Scoreboard from './Components/Scoreboard/Scoreboard'
import Profile from './Components/Profile/Profile'
import TicTacToe from './Components/TicTacToe/TicTacToe'


export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/chess" component={Chess} />
        <Route path="/tictactoe" component={TicTacToe}/>
        <Route path="/scoreboard" component={Scoreboard} />
        <Route path="/profile" component={Profile} />
    </Switch>
)
