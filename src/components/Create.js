import React from 'react';
import {Link} from 'react-router-dom'

let Create = (props) => {
    return (
        <div>
            <h1>Create an Account</h1>
            <img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='welcomelogo'></img><br></br>
            <form onSubmit={props.create}>
            <input type='text' name='name' placeholder='Name' onChange={props.collect} required></input><br></br>
            <input type='text' name='username' placeholder='Username' onChange={props.collect} required></input><br></br>
            <input type='password' name='password' placeholder='Password' onChange={props.collect} required></input><br></br>
            <input type='submit' value='Create Account'></input>
            </form>
        </div>
    )
}

export default Create