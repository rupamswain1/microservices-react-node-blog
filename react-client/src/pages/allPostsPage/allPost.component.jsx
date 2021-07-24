import React from 'react';
import AddPost from '../../components/addPost/addPost.component'

import './allPost.style.scss';
const AllPostPage=()=>{
    return(
        <div className='allPostPageMainContainer'>
            <div className='addNewPostMainContainer'>
                <AddPost/>
            </div>
            <div className='displayAllPostMainContainer'>
                All Post will be displayed here
            </div>
        </div>
    )
}

export default AllPostPage;