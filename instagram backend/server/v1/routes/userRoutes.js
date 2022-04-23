const express = require('express');
const UserRouter = express.Router();

const  userController = require('../controllers/userController');
const userRepo = new userController();

const auth = require('../../auth/auth');
const multer = require('multer');


var storage = multer.diskStorage({
  destination:((req,file,cb)=>{
      cb(null , 'server/uploads')
  }),
  filename: ((req,file,cb)=>{
      cb(null, file.fieldname+'-'+Date.now()+file.originalname)
  
  })
})

const uploads = multer({storage:storage})





UserRouter.route('/check').get(auth,(req,res)=>{
    res.send('ronda checka rond checka');
    
})

UserRouter.route('/signup').post(uploads.single('profilePic'),(req,res)=>{

    userRepo.userSignup(req.body,req.file).then(user=>{
      return res.json({success:true,data:user})
    }).catch(err=>{
       return res.json({success:false,data:err})
    })
})

UserRouter.route('/login').post((req,res)=>{
    userRepo.userLogin(req.body).then(user=>{
      console.log(user)
       return res.json({success:true,data:user})
    }).catch(err=>{
      return  res.json({success:false,data:err})
    })
})


UserRouter.route('/getUser').get(auth,(req,res)=>{
  userRepo.getUser(req.user).then(user=>{
    return res.json({success:true,data:user})
  }).catch(err=>{
    return  res.json({success:false,data:err})
  })
})

module.exports = UserRouter;