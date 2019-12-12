import React from 'react'
import NavBar from '../components/NavBar'
import Parks from './Parks'

let Main = (props) => {
   
    return (
        <div>
            <div>
                <NavBar search={props.search} searchTerm={props.searchTerm}/>
            </div>
           <div>
                <Parks parks={props.parks} display={props.display}/>
           </div>
        </div>
       
    )
}

export default Main