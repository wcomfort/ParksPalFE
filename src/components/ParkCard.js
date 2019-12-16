import React from 'react'
import {Link} from 'react-router-dom'

let ParkCard = (props) => {
    return (
            <div class='card' onClick={props.display} id={props.park.id}>
            <Link to={`/park/${props.park.id}`} className="parkName">
            <img class='img' src={props.park.image}></img>
            </Link>
            <h2>{props.park.name}</h2>
            <button onClick={props.favorite}>Favorite</button>
            </div>  
    )
}

export default ParkCard