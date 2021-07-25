import React from 'react';
import './post.style.scss';
const Post=()=>{
    return(
        <div className='postMainContainer'>

           <div className='postTitle'>
                
                This is Post title

            </div> 
            <div className='postDescription'>
                This is Post Description This is Post Description This is Post DescriptionThis is Post DescriptionThis is Post DescriptionThis is Post DescriptionThis is Post DescriptionThis is Post DescriptionThis is Post DescriptionThis is Post DescriptionThis is Post Description
            </div>
            <div className='postaddedOn'>
                Date: 20 Jan 1995
            </div>
            <div className='postComments'>
                <div className='commentHeader'>
                    comments
                </div>
                <div className='enterComment'>
                    <form className='enterCommentForm'>
                        <input type='text' placeHolder="Enter Comment" className='commentInput'/>
                        <input value='Post Comment' type='submit' className='commentSubmitBtn'/>
                    </form>
                </div>
                <div className='commentsSection'>
                        <div className="comment">
                            <div className='commentDate'>
                                 20 Jan 1995
                            </div>
                            <div className='commetText'>
                                comment textcomment textcomment textcomment textcomment textcomment text
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Post;