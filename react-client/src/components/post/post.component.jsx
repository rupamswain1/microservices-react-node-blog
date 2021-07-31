import React,{useState,useEffect} from 'react';
import './post.style.scss';
import axios from 'axios';
const Post=(singlePost)=>{
    //console.log(singlePost.data)
    const {_id,postId,title,content,addedOn,comments}=singlePost.data;
    //const [comments,setComments]=useState([]);
    const [postComment,setPostComment]=useState();
    //const [dataLoaded,setDataLoaded]=useState(false);
    // useEffect(()=>{
       
    //     axios.get(`http://localhost:8001/comments/${_id}`,{headers:{'Content-Type': 'application/json'}})
    //     .then(commentResult=>{
    //         //console.log(commentResult)
    //         if(!commentResult.data.message===undefined){
    //             setComments([]);
    //             setDataLoaded(true)
    //         }
    //         else{
    //             setComments(commentResult.data.comments);
    //             setDataLoaded(true)
    //         }
    //         //console.log(comments.length);
    //     })
    //     .catch(err=>console.log(err))
    // },[])

    const submitComment= async(event)=>{
            event.preventDefault();
            const body={comment:postComment};
            const response=await axios.post(`http://localhost:8001/comments/${postId}`,body,{headers:{'Content-Type': 'application/json'}});
            console.log(response.data)
            comments.push(response.data);
            //console.log(comments)
            setPostComment('')
    }
    //conso
    return(
        <div className='postMainContainer'>

           <div className='postTitle'>
                
                {title}

            </div> 
            <div className='postDescription'>
                {content}
            </div>
            <div className='postaddedOn'>
                Date: {new Date(addedOn).toLocaleDateString()}
            </div>
            <div className='postComments'>
                <div className='commentHeader'>
                    Comments
                </div>
                <div className='enterComment'>
                    <form className='enterCommentForm' onSubmit={submitComment}>
                        <input type='text' placeHolder="Enter Comment" className='commentInput' value={postComment} onChange={e=>setPostComment(e.target.value)}/>
                        <input value='Post Comment' type='submit' className='commentSubmitBtn'/>
                    </form>
                </div>
                <div className='commentsSection'>
                    {comments.length>0?
                        (comments?
                            (
                                comments.map(comment=>(
                                    <div className="comment">
                                        <div className='commentDate'>
                                            {new Date(comment.addedOn).toLocaleDateString()}
                                        </div>
                                        <div className='commetText'>
                                            {comment.comment}
                                        </div>
                                    </div>
                                ))
                            )
                            :(
                                <div className="comment">
                                        <div className='commetText'>
                                            No Comments
                                        </div>
                                    </div>
                            ))
                        :
                        <div>No Comments</div>
                    }
                       
                </div>
            </div>
        </div>
    )
}

export default Post;