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
        button =  <button onClick={this.props.filterFaves} className='ui button'>My Favorites</button>
        else
        button = <button onClick={this.props.parks} className='ui button'>All Parks</button>

        return (
            <div>
                <Link to='/parks' className='link'>
                <h1 className='logotext'>ParksPal<img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='logo'></img></h1>
                </Link>
                <div>
                {button}
                 <input type='text' placeholder='Search by Name or State' value={this.props.searchTerm} onChange={this.props.search} className='ui category search'/>
                 <Link to='/welcome'>
                 <button onClick={this.props.logout} className='ui button'>Logout</button>
                 </Link>
                </div>
            </div> 
        )
    }
}

export default NavBar