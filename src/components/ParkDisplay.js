import React from 'react'
import NavBar from './NavBar'
import { render } from '@testing-library/react'

class ParkDisplay extends React.Component {

    constructor(props){
        super (props)
        this.state={
            loading: true,
            businesses: [],
            park: false,
            comments: [],
            comment: ""
        }
    }

    componentDidMount(){
        
        let park = parseInt(localStorage.getItem('park'))
    
        fetch(`http://localhost:3000/parks/${park}`)
        .then(res => res.json())
        .then(park => {
          this.setState({
            park: park
          }, () => this.getBusiness())
        })   
        this.getComments()
    }

    getBusiness = () => {
        let park = { park: 
            { lat: this.state.park.lat, 
            long: this.state.park.long
            }   
        }
        fetch('http://localhost:3000/park/business', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(park)
        })
        .then(res => res.json())
        .then(bus => {
            this.setState({
            businesses: bus,
            loading: false 
            })
        })
    }

    getComments = () => {
      fetch(`http://localhost:3000/comments`)
      .then(res => res.json())
      .then(comments => {
        this.setState({
          comments: comments
        })
      }) 
    }

    writeComment = (event) => {
        this.setState({
            comment: event.currentTarget.value
        })
    }

    createComment = (event) => {
        event.preventDefault()
        let parkId = this.state.park.id
        let userId = this.props.user.id
        let content = this.state.comment
        fetch("http://localhost:3000/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({content: content ,park_id: parkId, user_id: userId})
        })
        this.setState({
            comment: ""
        })
        this.getComments()
    }

   render(){

        let parkId = this.state.park.id
        let parkCom = this.state.comments.filter(comment => comment.park_id === parkId)
        let comment = parkCom.map(comment => 
            <div>
                <p>{comment.content} - {comment.user.username}</p>
            </div>
            )

        let food
        if (this.state.loading === false && this.state.businesses.length === 0){
            food = <div>
                    <h2>Uh-Oh, You're Really Out There! Better Pack Some of These:</h2>
                    <a href="https://www.mountainhouse.com/m/category/entrees.html" target="_blank">Mountain House Meals</a><br></br>
                    <iframe src="https://giphy.com/embed/xT0xewLy70uaFY3Vte" width="480" height="247" frameBorder="0" class='gif' allowFullScreen></iframe>
                    </div>
                   
        }else{
            food = this.state.businesses.map(bus => 
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
                <a href={this.state.park.url} target="_blank"><h1>{this.state.park.name}</h1></a>
                <h3>{this.state.park.state}</h3>
                <p className='description'>{this.state.park.description}</p>
                <h4>Best Restaurants:</h4>
                {food}
                <h4>Comments:</h4>
                <form onSubmit={this.createComment}>
                    <input type='text' placeholder='Enter Comment' onChange={this.writeComment} value={this.state.comment} required></input>
                    <input type='submit' value='Add Comment'></input>
                </form>
                {comment}
            </div>
        </div>
    )
   }
}

export default ParkDisplay

