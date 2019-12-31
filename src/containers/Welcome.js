import React from 'react';
import {Link} from 'react-router-dom'

let Welcome = () => {
    return (
        <div>
            <div>
            <img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='welcomelogo'></img><br></br>
            </div>
            <div className='welcomecontainer'>
                <h1>Welcome to ParksPal</h1>
                <p>ParksPal is dedicated to bringing you the best businesses near our National Parks! Please remember to practice <a className='welcomelink' target='blank' href='https://lnt.org/why/7-principles/'>Leave No Trace Ethics!</a></p>
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
