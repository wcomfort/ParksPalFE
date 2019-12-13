import React from 'react';
import {Link} from 'react-router-dom'

let Welcome = () => {
    return (
        <div>
            <h1>Welcome to ParksPal</h1>
            <img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='welcomelogo'></img><br></br>
            <Link to='/login'>
                <button>Login</button>
            </Link>
            <Link to='/create_account'>
                <button>Create Account</button>
            </Link>
        </div>
    )
}

export default Welcome
