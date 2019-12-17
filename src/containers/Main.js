import React from 'react'
import NavBar from '../components/NavBar'
import Parks from './Parks'

class Main extends React.Component {

    constructor(){
        super()
        this.state={
            faves: false,
            favParks: []
        }
    }

    filterParks = () => { 
        let parkIds = this.state.favParks.map(fav => fav.park_id)
        let parks = this.props.parks
        if (this.state.faves === true){
           return parks.filter((park) => parkIds.includes(+park.id))
        }else{
           return parks
       }
    }

      getFavorites = () => {
        fetch('http://localhost:3000/favorites')
        .then(res => res.json())
        .then(favs => {
         let favParks = favs.filter(fav => (this.props.user.id === fav.user_id))
         this.setState({
             favParks: favParks,
             faves: true         
            }, () => this.filterParks())
        })
      }

      allParks = () => {
          this.setState({
              faves: false
          })
      }
    
    render(){
        return (
            <div>
                <div>
                    <NavBar logout={this.props.logout} search={this.props.search} searchTerm={this.props.searchTerm} filterFaves={this.getFavorites} faves={this.state.faves} parks={this.allParks}/>
                </div>
               <div>
                    <Parks parks={this.filterParks()} display={this.props.display} favorite={this.favorite} user={this.props.user}/>
               </div>
            </div>
        )
    }
}

export default Main