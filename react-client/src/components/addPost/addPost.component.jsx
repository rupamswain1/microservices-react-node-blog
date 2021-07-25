import React,{useState, useEffect} from 'react';
import './addPost.style.scss';
import axios from 'axios'
const AddPost=({updatePost})=>{
    const [postInput,setPostInput]=useState('');
    const [postDesc,setPostDesc]=useState('');

    const submitPost=async (e)=>{
        e.preventDefault();
        const body={title:postInput,content:postDesc};
        const response=await axios.post('http://localhost:8000/posts/',body,{headers:{'Content-Type': 'application/json'}});
        //console.log(updatePost);
        updatePost(post=>[...post,response.data])
        setPostInput('');
        setPostDesc('');
        //console.log('submitted')
    }
    return(
        <div className='addPostContainer'>
            <div className='addPostHeading'>
                Add a Post
            </div>
            <div className='inputGroup'>
                <form onSubmit={submitPost}>
                    <div className='inputBoxContainer'>
                        <input placeHolder="Enter Post Title Here" value={postInput} type='text' className='postInput' onChange={e=>setPostInput(e.target.value)}/>
                        <input placeHolder="Enter Post Description Here" value={postDesc} type='text' className='postInput' onChange={e=>setPostDesc(e.target.value)}/>
                    </div>
                    <div className='inputBtnContainer'>
                        <input type='submit' value='Submit Post' className='postSubmit'/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddPost;