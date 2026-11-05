import React, {useEffect, useState} from 'react'
import {BlogPostForm} from "./BlogPostForm"
function LoadPosts(props)
{
    const [newBlogs, setBlogs] = useState()

    function editPost(post) {
        return (
                <div>
                  <BlogPostForm
                  edit={post}
                  user={post.creator_user_id}
                  />
                </div>
        
            )
    }

    function delPost(id) {
        let info = {
            "id":id
        }
        
        fetch("/delblog", {
            method:'post',
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(info)
        })
        fetch("/getposts", {
        method:'get',
    }).then (
        response => response.json()
    ).then (
        data => {
            
            setBlogs(data);

            
        }
    )
    
    }
    
    
    useEffect(() => {

        fetch("/getposts", {
        method:'get',
    }).then (
        response => response.json()
    ).then (
        data => {
            
            setBlogs(data);

            
        }
    )

    }, [])
    
    

    
    return (
        <div>{(typeof newBlogs === 'undefined') ? (
                <p>Loading blog posts...</p>) : (
                  newBlogs.map(singlepost =>
        <div className="single-post">
            <div className="blog-top">
                <h2>{singlepost.title}</h2>
                <div className="blog-author"><h3>{singlepost.creator_name}</h3></div>
            </div>,
            <div className="blog-body">
                <div className="blog-content"><h3>{singlepost.body}</h3></div>
                <div className="blog-date"><h3>{singlepost.date_created}</h3></div>
            </div>
            <div className="blog-controls">
            {(props.user === singlepost.creator_user_id) ? (
                            
                  [
                    <button id="edit-button" onClick={() => console.log(editPost(singlepost))}>Edit</button>,
                    <button id="delete-button" onClick={() => delPost(singlepost.blog_id)}>Delete</button>
                  ]
                  ) : (
                  [
                    
                  
                  ]
                    )}

            </div>
        </div>
    )
                )}</div>
    )
    
        

    
   
    

    
}




export default LoadPosts;
export {LoadPosts};