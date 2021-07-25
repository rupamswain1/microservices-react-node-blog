import React,{useState,useEffect} from 'react';
import AddPost from '../../components/addPost/addPost.component'
import Post from '../../components/post/post.component';
import axios from 'axios';
import './allPost.style.scss';
const AllPostPage=()=>{
    const [posts,setPosts]=useState([]);
    const [dataLoaded,setDataLoaded]=useState(false);
    useEffect(()=>{
        axios.get('http://localhost:8000/posts/',{headers:{'Content-Type': 'application/json'}})
        .then(respose=>{
            console.log(respose.data.length)
            setPosts(respose.data)
            setDataLoaded(true);
            console.log(posts.length)
        })
        .catch(err=>console.log(err));
    },[])
    
    return(
        <div className='allPostPageMainContainer'>
            <div>{posts.length}</div>
            <div className='addNewPostMainContainer'>
                <AddPost updatePost={setPosts}/>
            </div>
            <div className='displayAllPostMainContainer'>
                {dataLoaded?
                    (   posts.length===0?<div>No Post Available</div>
                        :posts.map(singlePost=><Post key={singlePost._id} data={singlePost}/>
                    ))
                :<>Loader code should be here</>}
               
                
                
                

            </div>
        </div>
    )
}

export default AllPostPage;