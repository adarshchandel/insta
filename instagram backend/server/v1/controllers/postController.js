const Post = require('../../model/post');
const auth = require('../../auth/auth')


class postController {
    addPost(data ,user, file) {
        return new Promise((success, failed) => {
            if (!data.caption || !user || !file) {
                return failed('fill all the fields')
            }
            user.password=undefined
            const post = new Post({
                image: file.filename,
                caption: data.caption,
                postedBy: user
            })
            post.save()
            .then(post => {
                success(post)
                console.log(post)
            }).catch(err => {
                failed(err)
            })
        })

    }

    allPosts() {
        return new Promise((success, failed) => {
            Post.find({})
            .populate('postedBy' ,"_id userName profilePic")
            .then(posts => {
                success(posts)
            }).catch(err => {
                failed(err)
            })
        })
    }

    myPosts(user) {
        return new Promise((success, failed) => {
            Post.find({ postedBy: user._id })
            .populate('postedBy',"_id userName")
            .then(posts => {
                success(posts)
            }).catch(err => {
                failed(err)
            })
        })
    }

    deletePost(user){
        console.log(user)
        return new Promise((success,failed)=>{
            Post.findOneAndDelete({postedBy:user._id}).then(post=>{
                success('post deleted successfully')
            }).catch(error=>{
                console.log(error)
                failed(error)
            })
        })
    }

}


module.exports = postController;