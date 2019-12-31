import React from 'react'
import ParkCard from '../components/ParkCard'

class Parks extends React.Component {

    render(){
        return (
            <div class="container">
                {this.props.parks.map(park => <ParkCard key={park.id} display={this.props.display} park={park} user={this.props.user}/>)}
            </div>
        )
    }
   
}

export default Parks


