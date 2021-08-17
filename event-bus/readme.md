## Docker Image name



```bash
rupamswain1/event
```
## Application Port
```bash
8005
```

## Endpoints
# New Post
```bash
events/post
Request type: POST
body:
    {
    "title":"My First Post",
    "content":"T his is my first post"
}


events/comment
Request type: POST
```

# Add/remove data to event DB
```bash
getAll/postEvent
Request type: Get
: fetches all the data in Event DB

getAll/deletePostsEvents
Request type: Get
: delete the data in Event DB

getAll/deleteCommentEvents
Request type: Get
: delete the data in Event DB


getAll/commentevents
Request type: Get
: delete the comment data in Event DB
```