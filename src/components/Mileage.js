import React from 'react';

class Mileage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
            isUnitsMiles: '1'
        }

        this.handleDistance = this.handleDistance.bind(this);
    }

    handleDistance(event) {
        this.setState({
            distance: event.target.value
        }, () => {
            this.props.onMileageInput(this.state.distance, 
                this.state.isUnitsMiles, this.state.percentHwy);
        });
    }

    render() {
        return (
            <div className='flexbox2'>
                <div className='flexbox'>
                    <label>Distance to drive: </label>
                    <input type='text' value={this.state.distance}
                        onChange={this.handleDistance} />
                </div> 
            </div>
        )
    }
}

export default Mileage;