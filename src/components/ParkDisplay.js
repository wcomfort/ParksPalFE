import React from 'react'
import NavBar from './NavBar'
import { render } from '@testing-library/react'

class ParkDisplay extends React.Component {

    constructor(props){
        super (props)
        this.state={
            loading: true,
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
            results: bus,
            loading: false
        }))
    }

   render(){
        let food 

        if (this.state.loading === false && this.state.results.length === 0){
            food = <div>
                    <h2>Uh-Oh, You're Really Out There! Better Pack Some of These:</h2>
                    <a href="https://www.mountainhouse.com/m/category/entrees.html" target="_blank">Mountain House Meals</a><br></br>
                    <iframe src="https://giphy.com/embed/xT0xewLy70uaFY3Vte" width="480" height="247" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    </div>
                   
        }else{
            food = this.state.results.map(bus => 
                <div>
                    <a href={bus.url} target="_blank">{bus.name}</a>
                    <p>Address: {bus.location.address1} {bus.location.city}, {bus.location.state}</p>
                    <p>Phone: {bus.display_phone}</p>
                    <p>Rating: {bus.rating}</p>
                </div>
            ) 
        }
    return (
        <div>
            <div>
            <NavBar/>
            </div>
            <div className='display'>
            <a href={this.props.park.url} target="_blank"><h1>{this.props.park.name}</h1></a>
            <h3>{this.props.park.state}</h3>
            <p className='description'>{this.props.park.description}</p>
            {food}
            </div>
        </div>
    )
   }
}

export default ParkDisplay

