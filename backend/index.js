import express from "express";

import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 8000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let blogPosts = [];
let blogUsers = [];
const blogDatabase = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "BlogDB",
    password: "CLU2",
    port: 5432,
});
blogDatabase.connect();
updatePosts()

blogDatabase.query("SELECT * FROM users", (err, res) => {
    if (err)
    {
        console.log("Error occured gathering user database");
    }
    else
    {
        blogUsers = res.rows;
    }
    //blogDatabase.end();
});
let currUser = null;
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/blogs", (req, res) => {
    
    updatePosts();
    
    
    res.json({"user": null, "page": "home"})

});
app.get("/getposts", (req, res) => {
    
    
    res.json(blogPosts)

});
async function updatePosts()
{
    let postDB = await blogDatabase.query("SELECT * FROM blogs ORDER BY blog_id ASC");
    blogPosts = postDB.rows;
}
app.post("/editblog", (req, res) => {
    
});

app.post("/createblog", (req, res) => {

    res.json({"user": req.body.user_id, "page": "create"})
    
});
app.post("/postblog", (req, res) => {

    const day = new Date();
    const currDate = day.toISOString();
    let blogToEdit;
    currUser = req.body.user;
    console.log("Current user: " + currUser)
    res.json({"user": currUser, "page": "home"})
    if (req.body.id == undefined)
    {
        console.log(req.body)
        blogDatabase.query("INSERT INTO blogs (title, creator_user_id, creator_name, body, date_created) VALUES ($1, $2, $3, $4, $5)", [req.body.title, currUser, req.body.user, req.body.body, currDate]);
        
    }
    else
    {
        console.log("getting: " + res.body.id)
        blogDatabase.query("SELECT * FROM blogs WHERE blog_id='" + req.body.id + "'", (err, res) => {
        if (err)
        {
            console.log("Error editing blog post")
        }
        else
        {
            blogToEdit = res.rows[0];
            let updateQuery = "UPDATE blogs SET body = '" + req.body.body + "' WHERE blog_id= '" + req.body.id + "'";
            blogDatabase.query(updateQuery, (err, res) => {
                if (err)
                {
                    console.log(err);
                }
                else
                {

                    console.log("Post saved successfully");
                    updatePosts();
                }
            });
            
        }
    });
    }
    updatePosts();
    //res.redirect("/");
    
    
    
});
app.get("/userlogin", (req, res) => {

    res.json({"user": null, "page": "login"})
    
    
});
app.get("/usersignup", (req, res) => {

    res.json({"user": null, "page": "signup"})
    
    
});
app.get("/userlogout", (req, res) => {

    currUser = null;
    res.json({"user": null, "page": "home"})
    
});

app.post("/saveblog", (req, res) => {

    let redir = res;
    let updateQuery = "UPDATE blogs SET body = '" + req.body["b-content"] + "' WHERE blog_id= '" + req.body["saveindex"] + "'";
    blogDatabase.query(updateQuery, (err, res) => {
        if (err)
        {
            console.log(err);
        }
        else
        {

            console.log("Post saved successfully");
            updatePosts();
            redir.redirect("/");
        }
        //blogDatabase.end();
    });
    
    
});


// for removing test users
//blogDatabase.query("DELETE FROM blogs WHERE creator_user_id='test");
//blogDatabase.query("DELETE FROM users WHERE user_id='test'");
app.post("/delblog", (req, res) => {


    let delQuery = "DELETE FROM blogs WHERE blog_id= '" + req.body.id + "'";
    
    blogDatabase.query(delQuery, (err) => {
        if (err)
        {
            console.log(err);
        }
        else
        {

            console.log("Post deleted successfully");
            updatePosts();
            res.json({"user": currUser, "page": "home"})
        }
    });
    
});

app.post("/try-signup", (req, res) => {

    var isValid = checkNewUser(req, res)

    
    
    
});

function checkNewUser(req, response)
{

    let newUsername = null;
    blogDatabase.query("SELECT user_id FROM users WHERE user_id = '" + req.body.user_id + "'", (err, res) => {
    
        if (err)
        {
            console.log("error occured");
            return 0;
        }
        else
        {
            newUsername = res.rows[0];
            if (newUsername != undefined)
            {
                console.log(" User already exists");
                return 0;
            }
            else
            {
                console.log("User is valid");
                blogDatabase.query("INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3)", [req.body.user_id, req.body.pw, req.body.username]);
                currUser = newUsername;
                response.json({"user": req.body.user_id, "page": "home"})
                return 1;
                
            }
        }
    });
    
}

app.post("/try-login", (req, res) => {

    
    let username = null;
    let response = res;
    let attemptPass = req.body.pw;
    
    blogDatabase.query("SELECT user_id FROM users WHERE user_id = '" + req.body.user_id + "'", (err, res) => {
        if (err)
        {
            console.log("error occured");
        }
        else
        {
            
            if (res.rows[0] == undefined)
            {
                console.log("username does not exist");
            }
            else
            {
                console.log(res.rows[0].user_id);
                username = res.rows[0].user_id;
                validatePassword(username, attemptPass, response);
                  

                
                
            }
            
        }
    });
    
});



function validatePassword(user_id, inputPass, redir) 
{
    blogDatabase.query("SELECT password FROM users WHERE user_id = '" + user_id + "'", (err, res) => {
        if (err)
        {
            
        }
        else
        {
            
            if (res.rows[0] == undefined)
            {
                console.log(res.rows);
                return false;
            }
            else
            {
                if (inputPass != res.rows[0].password)
                {
                    
                    console.log("invalid password");
                }
                else
                {
                    console.log("Access granted");
                    currUser = user_id;
                    redir.json({user:user_id, page:"home"})
                }
                
                
            }
            
        }
    });
}
app.listen(port, () => {
    console.log('Server running on port ' + port);
    updatePosts();
    
});


