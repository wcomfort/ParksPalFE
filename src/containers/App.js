import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-browser-router";
import '../App.css';
import Main from './Main.js'
import ParkDisplay from '../components/ParkDisplay';

class App extends React.Component {
 
  constructor(){
    super()
    this.state={
      parks: [],
      searchTerm: ""
    }
  }

  componentDidMount(){
    this.getParks()
  }
 
  getParks = () =>{
    fetch('http://localhost:3000/parks')
    .then(res => res.json())
    .then(park => {
      this.setState({
        parks: park
      })
    })
  }

  displayPark = (event) => {
    let parkId = parseInt(event.currentTarget.id)
    console.log(parkId)
    this.setState({
      parkId: parkId
    })
  }

  search = (event) => {
    this.setState({
      searchTerm:  event.target.value
    })
  }

  render(){
    let parks = this.state.parks.filter(park => park.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || park.state.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    return (
      <Router>
         <div className="App"> 
        <Switch>
        <Route exact path="/parks" render={() => {
          return  <Main search ={this.search} searchTerm={this.state.searchTerm} parks={parks} display={this.displayPark}/>
        }}/>
        <Route exact path="/park/:id" render={(props) => {
          console.log(props)
            let park =  this.state.parks.find(park => park.id === this.state.parkId)   
          return <ParkDisplay park={park}/>
        }}/>
        </Switch> 
        </div>
      </Router>
    );
  }
}

export default App;
