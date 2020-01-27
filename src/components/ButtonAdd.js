import React from 'react';

function ButtonAdd(props) {
    return (
        <div>
            <button onClick={props.onClickAdd}>Compare another car</button>
        </div>
    );  
}

export default ButtonAdd;