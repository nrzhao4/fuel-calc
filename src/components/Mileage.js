import React from 'react';

class Mileage extends React.Component {
    constructor() {
        super();
        this.state = {
            distance: '',
            units: '',
            percentHwy: '',
        }

        this.handleDistance = this.handleDistance.bind(this);
        this.handlePercentHwy = this.handlePercentHwy.bind(this);
    }

    handleDistance(event) {
        this.setState({distance: event.target.value});
    }

    handlePercentHwy(event) {
        this.setState({percentHwy: event.target.value});
    }

    render() {
        console.log(this.state);
        return (
            <div className='flexbox2'>
                <div className='flexbox'>
                    <label>Distance to drive: </label>
                    <input type='text' value={this.state.distance} 
                        onChange={this.handleDistance} />
                </div>

                <div className='flexbox'>
                    <label>Percentage of total distance spent on the highway: </label>
                    <input type='text' value={this.state.percentHwy} 
                            onChange={this.handlePercentHwy} />
                </div>
                
            </div>
        )
    }
}

export default Mileage;