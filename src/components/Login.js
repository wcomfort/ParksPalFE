import React from 'react';

let Login = (props) => {

    return (
        <div>
            <img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='welcomelogo'></img><br></br>
            <div className='commcontainer'>
                <h1>Login</h1>
                <form onSubmit={props.login}>
                <input type='text' name='username' placeholder='Username' value={props.username} onChange={props.collect} required></input><br></br>
                <input type='password' name='password' placeholder='Password' value={props.password} onChange={props.collect} required></input><br></br>
                <input type='submit' value='Login' className='ui button'></input>
                </form>
            </div>
        </div>
    )
}

export default Login