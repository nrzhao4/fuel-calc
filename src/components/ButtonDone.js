import React from 'react';

function ButtonDone(props) {
    return (
        <div>
            <button className='button-primary' onClick={props.onClickDone}>Done</button>
        </div>
    );
}

export default ButtonDone;