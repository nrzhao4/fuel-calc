import React from "react";

function ButtonReset(props) {
  return (
    <div>
      <button onClick={props.onClickReset}>Reset</button>
    </div>
  );
}

export default ButtonReset;
