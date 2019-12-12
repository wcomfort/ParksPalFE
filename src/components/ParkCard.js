import React from 'react'
import {Link} from 'react-router-dom'

let ParkCard = (props) => {
    return (
        <Link to={`/park/${props.park.id}`} className="parkName">
        <div class='card' onClick={props.display} id={props.park}>
            <img class='img' src={props.park.image}></img>
            <h2>{props.park.name}</h2>
        </div>
        </Link>
    )
}

export default ParkCard