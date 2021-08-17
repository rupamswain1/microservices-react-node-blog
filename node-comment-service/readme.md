## Docker Image name
rupamswain1/comments


```bash
rupamswain1/comments
```
## Application Port
```bash
8001
```

## Endpoints
# New Comment
```
/comments/:id
Request type: POST
body:{
     "comment":"my first comment"
}

/comments/:id
Request type: GET
```

Description: Every comment added is stored in DB with postId, comment id, comment and added On date.