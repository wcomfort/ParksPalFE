import React from 'react'
import {Link} from 'react-router-dom'
import { tsPropertySignature } from '@babel/types'

class NavBar extends React.Component {

    constructor(){
        super()
    }

    render(){
        let button 
        if (this.props.faves === false)
        button =  <button onClick={this.props.filterFaves}>My Favorites</button>
        else
        button = <button onClick={this.props.parks}>All Parks</button>

        return (
            <div>
                <Link to='/parks' class='parkName'>
                <h1 className='logotext'>ParksPal<img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='logo'></img></h1>
                </Link>
                <Link to='/my_account'>
                <button>My Account</button>
                </Link>
                 {button}
                 <input type='text' placeholder='Search by Name or State' value={this.props.searchTerm} onChange={this.props.search}/>
                 <Link to='/welcome'>
                 <button onClick={this.props.logout}>Logout</button>
                 </Link>
            </div> 
        )
    }
}

export default NavBar