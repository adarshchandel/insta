const User = require('../../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../keys');


class userController {
    userSignup(data,file) {
        
        return new Promise((success, failed) => {
            const { name, email, password} = data
            if (!name || !email || !password || !file) {
                failed('please enter all details')
            } else {
                User.findOne({ email: email }).then(user => {
                    if (user) {
                        failed('user already exist with this email')
                    } else {
                        bcrypt.hash(password, 12).then(hashedPasswod => {
                            let user = new User({
                                userName: name,
                                email: email,
                                password: hashedPasswod,
                                profilePic:file.filename
                            })
                            user.save().then(user => {
                                success(user)
                                console.log(user)
                            }).catch(err => {
                                failed(err)
                                console.log(err)
                            })
                        })

                    }
                })
            }
        })
    }

    userLogin(data) {
        return new Promise((success, failed) => {
            const { email, password } = data
            if (!email || !password){
                failed('please enter email and password')
            }else{
                User.findOne({ email: email }).then(user => {
                   if(!user){
                       failed('either email or password is wrong')
                   }else{
                       bcrypt.compare(password,user.password).then(doMatch=>{
                        console.log(doMatch)
                           if(doMatch==true){
                            const token = jwt.sign({_id : user._id},JWT_SECRET)
                            // const {_id,userName,email}=user
                            success(token)
                            

                           }else{
                               failed('either email or password is wrong')
                           }
                       })
                   }
                })
            }
        })
    }

    getUser(user){
        return new Promise((success,failed)=>{

            User.findById({_id:user.id}).then(user=>{
                user.password=undefined
                success(user)
            }).catch(err=>{
                failed(err)
            })
        })
    }
}



module.exports = userController;