import React from 'react'
import NavBar from './NavBar'
import { render } from '@testing-library/react'

class ParkDisplay extends React.Component {

    constructor(props){
        super (props)
        this.state={
            results: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/park/business', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({lat: this.props.park.lat, long: this.props.park.long})
        })
        .then(res => res.json())
        .then(bus => this.setState({
            results: bus
        }))
    }

   render(){
    return (
        <div>
            <div>
            <NavBar/>
            </div>
            <div className='display'>
            <h1>{this.props.park.name}</h1>
            <h3>{this.props.park.state}</h3>
            <p className='description'>{this.props.park.description}</p>
            {this.state.results.map(bus => 
                <div>
                     <a href={bus.url}>{bus.name}</a> <p>Rating: {bus.rating}</p>
                </div>
            )}
            </div>
        </div>
    )
   }
}

export default ParkDisplay

