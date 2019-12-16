import React from 'react'
import {Link} from 'react-router-dom'
import { tsPropertySignature } from '@babel/types'
let NavBar = (props) => {
   
    return (
        <div>
            <Link to='/parks' class='parkName'>
            <h1 className='logotext'>ParksPal<img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='logo'></img></h1>
            </Link>
            <Link to='/my_account'>
            <button>My Account</button>
            </Link>
             <button onClick={props.filterFaves}>My Favorites</button>
             <input type='text' placeholder='Search by Name or State' value={props.searchTerm} onChange={props.search}/>
             <Link to='/welcome'>
             <button onClick={props.logout}>Logout</button>
             </Link>
        </div> 
    )
}

export default NavBar