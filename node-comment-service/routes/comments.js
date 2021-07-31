const express=require('express');

const Router=express();
const Comment=require('../models/comments');
const axios=require('axios');
Router.post('/:id',(req,res)=>{
    const postId=req.params.id;
    let addedComment;
    let extCommentId;
   
    Comment.findOne({postId:postId})
        .then(commentObj=>{
            if(commentObj){
                return Comment.updateOne({postId:postId},{$push:{comments:{comment:req.body.comment}}})
            }
            else{
                return new Comment({postId:postId,comments:[{comment:req.body.comment}]}).save();
            }
        })
        .then(result=>{
            Comment.aggregate([

                {
                    $match:  {postId: postId}
                },
                {
                    $unwind: "$comments"
                },
                {
                    $sort: {'comments.addedOn': -1}
                },
                {
                    $limit: 1
                },{
                    $project: { comments: 1, _id: 0 }
            
                }
               
            ]).exec((err, result) => {
                if (err) res.send(JSON.stringify(err));
                if (result) {
                    extCommentId=result[0].comments._id;
                    
                    const body={
                        comment:req.body.comment,
                        postId:postId,
                        commentId:result[0].comments._id
                    }
                    
                    axios.post('http://localhost:8005/events/comment',body)
                    .then(done=>{
                        console.log(done)
                        res.status(201).send({_id:result[0].comments._id,addedOn:result[0].comments.addedOn,comment:req.body.comment,});
                    }
                    )
                    .catch(err=>{
                        console.log(err.response.data.error)
                        Comment.findOneAndUpdate({postId:postId},{$pull:{comments:{_id:extCommentId}}})
                        .then(r=>{
                            console.log('comment deleted')
                            res.status(500).json({error:err.response.data.error});  
                        })
                       
                    })
                }
            
            }); 
        })
        // .then(result=>{
        //     Comment.findOne({postId:postId}).select('comments').sort({"comments.comment.addedOn":'1'})
        //     .then(obj=>{
        //         console.log(obj)
        //         const body={
        //             postId:postId,
        //             comment: req.body.comment,
        //         }
        //         res.status(201).json(obj);
        //        // 
                
        //     })
        // })//.
        // // then(addedComment=>{
        // //     res.status(201).json(obj);
        // // })
        // .catch(err=>{
        //     console.log(err)
        //     res.status(500).json(err)
        // })
})

Router.get('/:id',(req,res)=>{
    const postId=req.params.id;
    Comment.findOne({postId:postId})
            .then(obj=>{
                if(obj){
                    res.status(201).json(obj);
                }
                else{
                    res.status(200).json({postId:postId,message:'No Comments found'});
                }
                
            })
});

module.exports=Router;