import React from "react";

function ButtonReset(props) {
  return (
    <div className='button'>
      <button onClick={props.onClickReset}>Reset</button>
    </div>
  );
}

export default ButtonReset;
