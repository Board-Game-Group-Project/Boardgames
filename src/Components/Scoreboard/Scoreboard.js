import React, { useState } from "react";
import { connect } from "react-redux";
import './Scoreboard.css'

function Scoreboard (props) {
  const [scores, setScores] = useState({});
  const [personalScores, setPersonalScores] = useState({});

  const { player_id } = props.player
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