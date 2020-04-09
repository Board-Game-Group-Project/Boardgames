import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import './Scoreboard.css'

function Scoreboard (props) {
  const [scores, setScores] = useState({});
  const [personalScores, setPersonalScores] = useState({});

  const { player_id } = props.player

  useEffect(() => {
    axios.get(`/api/scoreboard/:${player_id}`,{player_id}).then((res) => {
      console.log(res)
    }).catch(err => console.log(err))

  })
  return (
    <div className="scoreboard">
      This is the Scoreboard
      Your Player ID is {player_id}
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    player: reduxState.playerReducer.player
  };
};

export default connect(mapStateToProps)(Scoreboard);