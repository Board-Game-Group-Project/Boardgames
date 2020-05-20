import React from 'react';

import '../Chess.css';

export default function Square(props) {

  return (
    <button className={"square "}
      id={`${props.shade}`}
      onClick={props.onClick}
      style={props.style}>

    </button>
  );

}
