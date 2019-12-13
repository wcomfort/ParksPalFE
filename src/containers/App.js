import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-browser-router";
import '../App.css';
import Main from './Main.js'
import Welcome from './Welcome.js'
import Login from '../components/Login'
import Create from '../components/Create'
import ParkDisplay from '../components/ParkDisplay';
import MyAccount from '../components/MyAccount';

class App extends React.Component {
 
  constructor(){
    super()
    this.state={
      parks: [],
      searchTerm: "",
      name: "",
      username: "",
      password: "",
      user: null
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

    
  collectInfo = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  } 

  login = (event) => {
    event.preventDefault()
    let username = this.state.username
    let password = this.state.password.toString()
    console.log(username, password)
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(res => res.json())
      .then(userObj => {
        if(userObj){
          this.setState({
            user: userObj,
            username: userObj.username,
            password: ""
          })
        }else{
         alert('Please Enter a Valid Login')
          }
        })
      }

  createAccount = (event) => {
    event.preventDefault()
    console.log('creating account')
    let name= this.state.name
    let username = this.state.username
    let password = this.state.password.toString()
    console.log(username, password)
    fetch("http://localhost:3000/create_account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({name: name, username: username, password: password})
    })
    .then(res => res.json())
      .then(userObj => {
        this.setState({
          user: userObj
        })
      })
  }

  displayPark = (event) => {
    let parkId = parseInt(event.currentTarget.id)
    console.log(parkId)
    this.setState({
      parkId: parkId,
      searchTerm: ""
    })
  }

  filterParks = (parks) => { 
   if (parks.length > 0){
     return parks.filter(park => park.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || park.state.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }else{
    return null
  }
  }
  

  search = (event) => {
    this.setState({
      searchTerm:  event.target.value
    })
  }

  render(){

    return (
      <Router>
         <div className="App"> 
        <Switch>

        <Route exact path="/" render={() => {
          return <Redirect to='/welcome'/>
        }}/>

        <Route exact path="/welcome" render={() => {
          return <Welcome/>
        }}/>

        <Route exact path="/login" render={() => {
          return this.state.user ?( <Redirect to='/parks'/>
            ) : (
              <Login username={this.state.username} password={this.state.password} login={this.login} collect={this.collectInfo}/>
            )
        }}/>
        
        <Route exact path="/my_account" render={() => {
          return <MyAccount user={this.state.user}/>
        }}/>

        <Route exact path="/create_account" render={() => {
          return this.state.user ? ( <Redirect to='/parks'/>) : <Create name={this.state.name} username={this.state.username} password={this.state.password} create={this.createAccount} collect={this.collectInfo}/>
        }}/>

        <Route exact path="/parks" render={() => {
          return  <Main search ={this.search} searchTerm={this.state.searchTerm} parks={this.filterParks(this.state.parks)} display={this.displayPark}/>
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
