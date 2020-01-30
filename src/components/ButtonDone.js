import React from 'react';

function ButtonDone(props) {
    return (
        <div className='button'>
            <button onClick={props.onClickDone}>Done</button>
        </div>
    );
}

export default ButtonDone;