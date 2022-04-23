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
  userData: any;
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
      this.getUser()
    })

  
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


  getUser() {
    this.api.profileWithPosts({profileUser : this.profileUserId , userId : this.userID}).subscribe((res)=>{
      if(res['success']){
        res['data'].isMyProfile == "false" ? 
        res['data'].isMyProfile = false :
        res['data'].isMyProfile= true
        this.userData = res['data']
        console.log('res==>>',this.userData)
      }
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
  followUser(follow){
    let data={
      followedUser:this.profileUserId ,
      follower:this.userID,
      isFollow : !follow
    }
    this.api.followUser(data).subscribe((res)=>{
      if(res['success']==true){
        this.userData.isFollow = !follow
        if(!follow){
          this.userData.follower++
        }else{
          this.userData.follower--
        }
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
