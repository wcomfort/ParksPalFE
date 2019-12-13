import React from 'react';
import {Link} from 'react-router-dom'

let Create = () => {
    return (
        <div>
            <h1>Create an Account</h1>
            <input type='text' placeholder='name'></input><br></br>
            <input type='text' placeholder='Username'></input><br></br>
            <input type='password' placeholder='Password'></input><br></br>
            <input type='submit' value='Create Account'></input>
        </div>
    )
}

export default Create