import React from 'react';

class Mileage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
            isUnitsMiles: '0'
        }
        this.handleDistance = this.handleDistance.bind(this);
        this.onSelectUnit = this.onSelectUnit.bind(this);
    }

    handleDistance(event) {
        this.setState({
            distance: event.target.value
        }, () => {
            this.props.onMileageInput(this.state.distance, 
                this.state.isUnitsMiles, this.state.percentHwy);
        });
    }

    onSelectUnit(event) {
        this.setState({
            isUnitsMiles: event.target.value
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
                    <div>
                        <select className='dropdown' value={this.state.isUnitsMiles} 
                        onChange={this.onSelectUnit}>
                            <option value='0'>km</option>
                            <option value='1'>mi</option>
                        </select>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Mileage;