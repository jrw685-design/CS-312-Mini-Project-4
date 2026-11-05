import {GetSignup} from './signup.jsx'

const home = 1;

function goSignup(event)
{
    fetch("/usersignup", {
        method:'post',
    }).then (
        response => response.json()
    ).then (
        data => {
            console.log("data")
        return data

        }
    )
}

function goLogin(event)
{
    console.log("b")
    fetch("/userlogin", {
        method:'post'
    })
}
function createPost()
{
    fetch("/createblog", {
        method:'post'
    })
}
function logoutUser()
{
    fetch("/userlogout", {
        method:'post'
    })
}
function GetHome(user)
{
    return (
        <div>
            <head>
                <link rel="stylesheet" href="styles1.css"/>
                    <title>Home Page</title>
            </head>
            <body>
                <h1>Mini-Project 4</h1>
                {(user === null) ? (
                    
                    [
                    <button id="signup-button" onClick={goSignup}>Sign Up</button>, 
                    <button id="login-button" onClick={goLogin}>Log In</button>
                    ]
            ) : (
                [

                    <button id="create-button" onSubmit={createPost}>Add New Blog Post</button>,
                    <button id="logout-button" onSubmit={logoutUser}>Logout</button>

                    
                ]
            )}
            </body>
        </div>

    )
}

export default home;
export {GetHome, goSignup};