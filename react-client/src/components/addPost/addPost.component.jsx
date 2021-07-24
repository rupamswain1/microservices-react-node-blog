import React,{useState} from 'react';
import './addPost.style.scss';

const AddPost=()=>{
    const [postInput,setPostInput]=useState('');
    const submitPost=(e)=>{
        e.preventDefault();
        //post code here
        console.log('submitted')
    }
    return(
        <div className='addPostContainer'>
            <div className='addPostHeading'>
                Add a Post
            </div>
            <div className='inputGroup'>
                <form onSubmit={submitPost}>
                    <div className='inputBoxContainer'>
                        <input placeHolder="Enter Post Here" value={postInput} type='text' className='postInput' onChange={e=>setPostInput(e.target.value)}/>
                    </div>
                    <div className='inputBtnContainer'>
                        <input type='submit' className='postSubmit'/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddPost;