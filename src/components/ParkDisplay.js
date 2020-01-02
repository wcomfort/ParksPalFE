import React from 'react'
import NavBar from './NavBar'
import BDropdown from './Dropdown'



const tableStyle={
    width: '70vw',
    marginLeft: '15vw',
    marginRight: '15vw'
}

class ParkDisplay extends React.Component {

    constructor(props){
        super (props)
        this.state={
            loading: true,
            businesses: [],
            business: "Restaurants",
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
            long: this.state.park.long,
            business: this.state.business.toLowerCase()
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
          body: JSON.stringify({comment: {content: content ,park_id: parkId, user_id: userId}})
        })
        .then(res => res.json())
        .then(com => {
        this.setState({
            comments: [...this.state.comments, com],
            comment: ""
        })
    })
    }

    renderComment = (state) => {
        let parkId = state.park.id
        let parkCom = state.comments.filter(comment => comment.park_id === parkId)
        return parkCom.map(com => 
            <div>
                <p className='comment'>{com.content} - {com.user.username}</p>
            </div>
            )
    }

    businessSearch = (event) => {
        console.log(event.currentTarget)
        this.setState({
            business: event.currentTarget.id
        }, () => this.getBusiness())
      }

   render(){

        let food
        if (this.state.loading === false && this.state.businesses.length === 0){
            food = <div>
                    <h2>Uh-Oh, You're Really Out There! Better Prepare and Pack Some of These:</h2>
                    <a href="https://www.mountainhouse.com/m/category/entrees.html" target="_blank" className='welcomelink'><h3>Mountain House Meals</h3></a><br></br>
                    <iframe src="https://giphy.com/embed/xT0xewLy70uaFY3Vte" width="480" height="247" frameBorder="0" class='gif' allowFullScreen></iframe>
                    </div>
                   
        }else{
            food =
            <table style={tableStyle} class="ui celled table">
            <thead>
            <tr><th id="tablehead">Name</th>
            <th id="tablehead">Address</th>
            <th id="tablehead">Phone</th>
            <th id="tablehead">Rating</th>
            </tr></thead>
            <tbody>
            {this.state.businesses.map(bus => 
            <tr>
                <td data-label="Name" id="tablebody"> <a href={bus.url} target="_blank" className='welcomelink' >{bus.name}</a></td>
                <td data-label="Address" id="tablebody"><p>{bus.location.address1} {bus.location.city}, {bus.location.state}</p></td>
                <td data-label="Phone" id="tablebody">{bus.display_phone}</td>
                <td data-label='Rating' id="tablebody">{bus.rating}</td>
            </tr>
            ) }
            </tbody>
            </table>
        }



    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div className='display displaybackground'>
                <a href={this.state.park.url} target="_blank" className='welcomelink'><h1 id='text'>{this.state.park.name}</h1></a>
                <h3>{this.state.park.state}</h3>
                <p className='description'>{this.state.park.description}</p><br></br>
                <div className='dropdown'>
                <BDropdown businessSearch={this.businessSearch}/>
                <h2>Best {this.state.business}:</h2>
                </div>
                {food}
                <div>
                <h2>Comments:</h2>
                <form onSubmit={this.createComment} className="ui search commentform">
                    <input type='text' placeholder='Enter Comment' onChange={this.writeComment} value={this.state.comment} required className='prompt commentbar'></input>
                    <input id='button' type='submit' value='Add Comment' className='ui button'></input>
                </form>
                <div  className='commcontainer'>
                    {this.renderComment(this.state)}
                </div>
                </div>
            </div>
        </div>
    )
   }
}

export default ParkDisplay

