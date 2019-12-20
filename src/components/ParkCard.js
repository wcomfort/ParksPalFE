import React from 'react'
import {Link} from 'react-router-dom'

class ParkCard extends React.Component{

    constructor(){
        super()
        this.state={
            userFavorites: []
        }
    }

    componentDidMount(){
      console.log(this.props.user)
      if (this.props.user) {
        this.setState({
            userFavorites: this.props.user.favorites
        })
      }
    }

    addFavorite = (event) => {
        let parkId = parseInt(event.currentTarget.parentElement.id)
        let userId = this.props.user.id
        fetch("http://localhost:3000/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({favorite: {user_id: userId, park_id: parkId}})
        })
        .then(res => res.json())
        .then(res => {
          if (res.id === null){
            alert("Already a Favorite!")
          }else{
            alert('Added to Favorites!')
            this.setState({
                userFavorites: [...this.state.userFavorites, res]
            })
          }
        })
      }

    deleteFavorite = (event) => {
        let parkId = parseInt(event.target.parentElement.id)
        fetch('http://localhost:3000/favorites', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({park_id: parkId, user_id: this.props.user.id})
          })
          .then(res => res.json())
          .then(res => {
              let update = this.state.userFavorites.filter(fav => (fav.park_id !== res[0].park_id))
                this.setState({
                userFavorites: update
                })
                alert("Favorite Deleted!")
            })
    }

    button = () => {
          let favIds = this.state.userFavorites.map(fav => fav.park_id)
          let parkId = this.props.park.id
          if (favIds.includes(parkId)) 
            return <button onClick={this.deleteFavorite}>Delete Favorite</button>
          else
            return <button onClick={this.addFavorite}>Favorite</button>
  
    }
    

    render(){

  
        
        return (
            <div class='card' onClick={this.props.display} id={this.props.park.id}>
            <Link to={`/park/${this.props.park.id}`} className="parkName">
            <img class='img' src={this.props.park.image}></img>
            </Link>
            <h2>{this.props.park.name}</h2>
            {this.button()}
            </div>  
    )
    }    
}

export default ParkCard