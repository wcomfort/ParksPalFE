import React from 'react'
import {Link} from 'react-router-dom'

class ParkCard extends React.Component{

    constructor(){
        super()
        this.state={
            favorite: false
        }
    }

    render(){
        return (
            <div class='card' onClick={this.props.display} id={this.props.park.id}>
            <Link to={`/park/${this.props.park.id}`} className="parkName">
            <img class='img' src={this.props.park.image}></img>
            </Link>
            <h2>{this.props.park.name}</h2>
            <button onClick={this.props.favorite}>Favorite</button>
            </div>  
    )
    }    
}

export default ParkCard