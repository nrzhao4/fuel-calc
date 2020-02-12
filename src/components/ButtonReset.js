import React from "react";

function ButtonReset(props) {
  return (
    <div>
      <button className='button-secondary' onClick={props.onClickReset}>Reset</button>
    </div>
  );
}

export default ButtonReset;
