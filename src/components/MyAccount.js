import React from 'react';
import {Link} from 'react-router-dom'
import NavBar from './NavBar';

let MyAccount = (props) => {
    return (
        <div>
            <NavBar/>
            <div>
            <h1>Welcome {props.user.username}!</h1>
            <h3>My Comments</h3>
            </div>
        </div>
    )
}

export default MyAccount