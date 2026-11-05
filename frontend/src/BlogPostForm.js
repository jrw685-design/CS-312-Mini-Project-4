import {useState, useEffect} from 'react'

function BlogPostForm(props)
{
    const [title, SetTitle] = useState("")
    const [body, SetBody] = useState("")
    let type = "Create New";
    function changeTitle(event)
    {

        SetTitle(event.target.value)
        

    }
    function changeBody(event)
    {
        SetBody(event.target.value)
    }
    function submitPost()
    {
        if (title === "" || body === "")
        {
            return;
        }
        let info = {
            title: title,
            body: body,
            edit: props.edit,
            id: props.id,
            user: props.user
        }
        
        fetch("/postblog", {
                method:'post',
                headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify(info)
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data)
                }
            )
            
    }


    useEffect(() => {

    
    
    if (props.edit === undefined)
    {
        SetTitle("")
        SetBody("")
    }
    else
    {
        SetTitle(props.edit.title)
        SetBody(props.edit.body)
    }
    
    }, [])
    return (
        <div>
          <link rel="stylesheet" href="styles2.css"/>
          <h1>{type} Blog Post</h1>
          <div className="allfields">
          <div className="createsect">
          <h2>Title</h2>
          <input
            onChange={changeTitle}
            type="text"
            placeholder="Title"
            value={title}
            className="title-input"
            
          />
          </div>
          <div className="contentfield">
          <h2>Content</h2>
          <textarea
            onChange={changeBody}
            type="text"
            placeholder="body"
            value={body}
            className="body-input"
          />
          </div>
          <button onClick={submitPost}>Submit</button>
          </div>
        </div>
        )
}


export {BlogPostForm}