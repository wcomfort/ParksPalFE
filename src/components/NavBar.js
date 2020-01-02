import React from 'react'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {

    constructor(){
        super()
    }

    render(){
        let button 
        if (this.props.faves === false)
        button =  <button onClick={this.props.filterFaves} className='ui button'  id='button'>Favorites</button>
        else
        button = <button onClick={this.props.parks} className='ui button'  id='button'>All Parks</button>

        return (
            <div className='navbar'>
                <div className='navBtnLogo'>
                    <Link to='/parks' className='link'>
                    <h1 className='logotext'>ParksPal<img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='logo'></img></h1>
                    </Link>
                </div>
                <div className="navBtn">
                    {button}
                </div>
                <div className="navBtn ui search">
                    <input type='text' placeholder='Search by Name or State' value={this.props.searchTerm} onChange={this.props.search} className='prompt searchBar'/>
                </div>
                <div className="navBtn">
                    <Link to='/welcome'>
                    <button onClick={this.props.logout} className='ui button' id='button'>Logout</button>
                    </Link>
                </div>
            </div> 
        )
    }
}

export default NavBar