import React from 'react';
import {Link} from 'react-router-dom'

let Welcome = () => {
    return (
        <div>
            <h1>Welcome to ParksPal</h1>
            <div>
            <img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='welcomelogo'></img><br></br>
            </div>
            <div>
            <Link to='/login'>
                <button className='ui button'>Login</button>
            </Link>
            <Link to='/create_account'>
                <button className='ui button'>Create Account</button>
            </Link>
            </div>
         
        </div>
    )
}

export default Welcome
