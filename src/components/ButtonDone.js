import React from 'react';

function ButtonDone(props) {
    return (
        <div>
            <button onClick={props.onClickDone}>Done</button>
        </div>
    );
}

export default ButtonDone;