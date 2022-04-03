import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import {ActivatedRoute,Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any=[];

  imgUrl = 'http://localhost:8000/static/';

  image: any = {}
  posts: any=[];
  follower:number=10
  following:number=15
  length: any;
  userID: any;
  isloggedIn: any;
  profileUserId: any;
  postData: any=[];
  userPost: any;
  commentsList: any;
  constructor(
    private api: ApiService,
    private route :ActivatedRoute,
    private router:Router,
    private spinner :NgxSpinnerService
  ) { }

  ngOnInit(): void {

  this.userID=localStorage.getItem("userId")
    this.route.params.subscribe((res)=>{
      this.profileUserId=res.id
      this.getUser(res.id)
    })
   this.checkUser()
   this.api.profileWithPosts({profileUser : this.profileUserId , userId : this.userID}).subscribe((res)=>{
     console.log('res==>>',res)
   })
  }

  checkUser(){
    this.userID=localStorage.getItem("userId")
    if(this.userID){
      
    // this.getUser()
    }else{
      this.router.navigate([''])
    }
  }

  getUserPosts() {
    let data={
      id:this.profileUserId
    }
    this.spinner.show()
    this.api.getMyPosts(data).subscribe((res: any) => {
      if(res['success']==true){
        this.posts = res.data
      // console.log("posts===>>",this.posts)
      this.spinner.hide()
      this.length = Object.keys(this.posts).length
      }else{
        this.spinner.hide()
      }

    })
  }


  getUser(id) {
    let data={
      id:id
    }
    this.api.getUserById(data).subscribe((res: any) => {
      this.user = res.data
      if(  (id == this.userID) || this.user.followers.includes(this.userID)){
        this.getUserPosts()
      }
      // console.log("user=====",this.user)
    })
  }

  deletePost(postId) {
    let data ={
      postId : postId
    }
    this.api.deletePost(data).subscribe((res:any) => {
      if (res.success == true) {
        this.getUserPosts()
      }
    })
  } 
  followUser(){
    let data={
      followedUser:this.profileUserId ,
      follower:this.userID
    }
    this.api.followUser(data).subscribe((res)=>{
      if(res['success']==true){
        // this.getUser()
      }
     
    })
   
  }

  unfollowUser(){
    let data={
      followedUser:this.profileUserId ,
      follower:this.userID
    }
    this.api.unFollowUser(data).subscribe((res)=>{
      if(res['success']==true){
        // this.getUser()
      }
    })
   
  }

  getPostData(id){
    let data={
      postId:id
    }
    this.spinner.show()
    this.api.getOnepost(data).subscribe((res)=>{
     if(res['success']==true){
      this.spinner.hide()
       this.postData =res['data']
       this.userPost= res['data'].postedBy._id
       this.commentList(id)
     }else{
      this.spinner.hide()
     }
    })
  }

  commentList(id){
    let data = {
      postId : id
    }
    this.api.getCommentsList(data).subscribe((res)=>{
      if(res['success']==true){
        this.commentsList=res['data']
      }

    })
  }

}
