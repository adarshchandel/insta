const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');
const postRepo = new postController();
const multer = require('multer');
const auth = require('../../auth/auth')



var storage = multer.diskStorage({
    destination:((req,file,cb)=>{
        cb(null , 'server/uploads')
    }),
    filename: ((req,file,cb)=>{
        cb(null, file.fieldname+'-'+Date.now()+file.originalname)
    
    })
})

const uploads = multer({storage:storage})



postRouter.route('/createPost').post(auth,uploads.single('image'),(req,res)=>{
   postRepo.addPost(req.body,req.user,req.file).then(post=>{
      return res.json({success:true,data:post})
   }).catch(err=>{
      return res.json({success:false,data:err})

   })
})

postRouter.route('/allPosts').get((req,res)=>{
    postRepo.allPosts(req.query).then(post=>{
       return res.json({success:true,data:post})
    }).catch(err=>{
        return res.json({success:false,data:err})
    })
})


postRouter.route('/myPosts').get(auth,(req,res)=>{
    postRepo.myPosts(req.user).then(post=>{
        res.json({success:true,data:post})
    }).catch(err=>{
        res.json({success:false,data:err})
    })

})


postRouter.route('/deletePost').delete(auth,(req,res)=>{
    postRepo.deletePost(req.user).then(post=>{
        res.json({success:true,data:post})
    }).catch(err=>{
        res.json({success:false,data:err})
    })
})

module.exports = postRouter;