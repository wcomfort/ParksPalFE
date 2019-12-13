import React from 'react';

let Login = (props) => {

    return (
        <div>
            <h1>Login</h1>
            <img src='http://cdn.onlinewebfonts.com/svg/img_498917.png' className='welcomelogo'></img><br></br>
            <form onSubmit={props.login}>
            <input type='text' name='username' placeholder='Username' value={props.username} onChange={props.collect}></input><br></br>
            <input type='password' name='password' placeholder='Password' value={props.password} onChange={props.collect}></input><br></br>
            <input type='submit' value='Login'></input>
            </form>
        </div>
    )
}

export default Login