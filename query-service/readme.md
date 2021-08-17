## Docker Image name



```bash
rupamswain1/query-service
```
## Application Port
```bash
8002
```

## Endpoints
# New Post
```bash
events/newPost
Request type: POST
body:
    {
    "postId":"postId",
    "title":"test title",
    "content":"test"
}

```
## New Comment
```bash
event/newComment
body:{
    "postId":"postId",
    "commentId":"test title",
    "comment":"test"
}
Request type: POST
```
## Get All Post with comment:
```bash
posts/allPosts
Request type : Get

Created to delete post 
```