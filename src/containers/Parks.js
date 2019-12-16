import React from 'react'
import ParkCard from '../components/ParkCard'

class Parks extends React.Component {
    render(){
        return (
            <div class="container">
                {this.props.parks.map(park => <ParkCard key={park.id} display={this.props.display} park={park}favorite={this.props.favorite}/>)}
            </div>
        )
    }
   
}

export default Parks


