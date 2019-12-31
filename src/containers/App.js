import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-browser-router";
import '../App.css';
import Main from './Main.js'
import Welcome from './Welcome.js'
import Login from '../components/Login'
import Create from '../components/Create'
import ParkDisplay from '../components/ParkDisplay';

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
    let user = parseInt(localStorage.getItem('user'))
    if (user){
    fetch(`http://localhost:3000/users/${user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({id: user})
    })
    .then(res => res.json())
    .then(user => {
      this.setState({
        user: user
      })
    })
    }
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
        console.log(userObj)
        if(userObj.id){
          localStorage.setItem('user', userObj.id)
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
      body: JSON.stringify({user:{name: name, username: username, password: password}})
    })
    .then(res => res.json())
      .then(userObj => {
        if(userObj.id){
          localStorage.setItem('user', userObj.id)
          this.setState({
            user: userObj
          })
        }
      })
  }

  logout = () => {
    this.setState({
      user: null,
      name: "",
      username: ""
    })
    localStorage.clear()
  }

  displayPark = (event) => {
    let parkId = parseInt(event.currentTarget.id)
    this.setState({
      searchTerm: ""
    })
    localStorage.setItem('park', parkId)
  }

  filterParks = (parks) => { 
   if (parks.length > 0){
     return parks.filter(park => park.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || park.state.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
   }else{
      return parks
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

        <Route exact path="/create_account" render={() => {
          return this.state.user ? ( <Redirect to='/parks'/>) : <Create name={this.state.name} username={this.state.username} password={this.state.password} create={this.createAccount} collect={this.collectInfo}/>
        }}/>

        <Route exact path="/parks" render={() => {
          return  <Main logout={this.logout} search ={this.search} searchTerm={this.state.searchTerm} parks={this.filterParks(this.state.parks)} display={this.displayPark} user={this.state.user}/>
        }}/>

        <Route exact path="/park/:id" render={(props) => {  
          return <ParkDisplay user={this.state.user} {...props} businessSearch={this.businessSearch}/>
        }}/>

        </Switch> 
        </div>
      </Router>
    );
  }
}

export default App;
