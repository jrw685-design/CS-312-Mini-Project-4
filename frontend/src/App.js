import React, {useEffect, useState} from 'react'
import {LoadPosts} from "./PostList.js"
import {BlogPostForm} from "./BlogPostForm"


function App() {
let renderedPosts = false;
const [backData, SetBackData] = useState([{}])
const [userID, SetID] = useState("")
const [pass, SetPW] = useState("")
const [username, SetName] = useState("")

const [currUser, setCurrUser] = useState("")


  useEffect(() => {
    fetch("/blogs").then(
      response => response.json()
    ).then(
      data => {
        SetBackData(data)
      }
    )
  }, [])

  return renderPage(backData)

function renderPage(response)
{
   
  if (response.page === "home")
  {
    return GetHome(response.user)
  }
  else if (response.page === "signup")
  {

    return GetSignup()
  }
  else if (response.page === "login")
  {
    return GetLogin()
  }
  else if (response.page === "create")
  {
    return GetPostForm("create", userID)
  }

}



function goSignup()
{
    fetch("/usersignup", {
        method:'get',
    }).then (
        response => response.json()
    ).then (
        data => {
            SetBackData(data)

        }
    )
}

function goLogin()
{
    fetch("/userlogin", {
        method:'get',
    }).then (
        response => response.json()
    ).then (
        data => {
            console.log(data)
            SetBackData(data)

        }
    )
}
function createPost()
{
    let info = {
    "user_id":userID,
  }  
  fetch("/createblog", {
        method:'post',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(info)
    }).then (
        response => response.json()
    ).then (
        data => {
            console.log(data)
            SetBackData(data)

        }
    )
}
function goLogout()
{

    SetID("")
    SetName("")
    SetPW("")
        fetch("/userlogout", {
        method:'get',
    }).then (
        response => response.json()
    ).then (
        data => {
            SetBackData(data)

        }
    )
}
function GetHome(user)
{

  
  
  return (
          <html>
          <head>
            <link rel="stylesheet" href="styles1.css"/>,
            </head>
            <body>
               <h1>Mini-Project 4</h1>
                  <div className="top-b">
                  {(user === null) ? (
                            
                  [
                    <button id="signup-button" onClick={goSignup}>Sign Up</button>, 
                    <button id="login-button" onClick={goLogin}>Log In</button>
                  ]
                  ) : (
                  [
        
                  <button id="create-button" onClick={createPost}>Add New Blog Post</button>,
                  <button id="logout-button" onClick={goLogout}>Logout</button>      
                  ]
                    )}
              </div>
              {(renderedPosts === false) ? (
              <div className="blog-posts">
              <LoadPosts 
                user={user}
                
              />
              </div>
              
              ) : (
                <div></div>
              )}
              </body>
              </html>
            
    )
}
function GetPostForm(edit, user)
{
  console.log("edit: " + edit)  
  return (
        <div>
          <BlogPostForm
          edit={edit}
          user={user}
          />
        </div>

    )
    
}

function GetSignup()
{
    return (

        <div>
          <link rel="stylesheet" href="styles3.css"/>
          <h1>Sign Up</h1>
          <div className="acc-label">
          <h2>User ID</h2>
          <input
            onChange={handleIDChange}
            type="text"
            placeholder="user ID"
            value={userID}
            className="id-input"
            
          />
          <h2>Password</h2>
          <input
            onChange={handlePWChange}
            type="text"
            placeholder="password"
            value={pass}
            className="pw-input"
          />
          <h2>Name</h2>
          <input
            onChange={handleNameChange}
            type="text"
            placeholder="username"
            value={username}
            className="name-input"
          />
          <button onClick={submitSignup}>Submit</button>
          </div>
        </div>

    )
    
}


function handleIDChange(event)
{

  SetID(event.target.value)

}
function handlePWChange(event)
{
  SetPW(event.target.value)

}
function handleNameChange(event)
{
  SetName(event.target.value)

}

function submitSignup()
{
  let info = {
    "user_id":userID,
    "pw":pass,
    "username":username
  }

        fetch("/try-signup", {
        method:'post',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(info)
    }).then (
        response => response.json()
    ).then (
        data => {
            SetBackData(data)

        }
    )
}

function GetLogin()
{
    return (

        <div>
          <link rel="stylesheet" href="styles3.css"/>
          <h1>Log In</h1>
          <div className="acc-label">
          <h2>User ID</h2>
          <input
            onChange={handleIDChange}
            type="text"
            placeholder="user ID"
            value={userID}
            className="acc-label"
            
          />
          <h2>Password</h2>
          <input
            onChange={handlePWChange}
            type="text"
            placeholder="password"
            value={pass}
            className="acc-label"
          />
          <button onClick={submitLogin}>Submit</button>
          </div>
        </div>

    )
    
}
function submitLogin()
{
  let info = {
    "user_id":userID,
    "pw":pass,
  }

        fetch("/try-login", {
        method:'post',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(info)
    }).then (
        response => response.json()
    ).then (
        data => {
            console.log(data)
            SetBackData(data)

        }
    )
}


}
export default App
