import React from 'react';

function Result(props) {
    const avgMpg = props.data.yourMpgVehicle.avgMpg[0];
    return(
        <div>
            <h1>
                Car result
            </h1>
            <p>{avgMpg}</p>
        </div>
    );
}

export default Result;