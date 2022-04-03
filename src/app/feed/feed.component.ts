import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import {ActivatedRoute,Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {SocketService} from '../socket.service'
import  {io} from 'socket.io-client'
import {FormBuilder,FormGroup, Validators } from '@angular/forms'
// import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  addComment:FormGroup
  isUser: any;
  allPosts:any;
  user:any;
  imgUrl = 'http://localhost:8000/static/';
  userId: any;
  isLoggedIn: boolean;
  isPosts: any;
  currentUserId: any;
  loggedInUserId: string;
  liked: boolean=false;
  postIndex:any
  color: any;
  disLike: boolean=false;
  postData: any;
  userPost: any;
  random:any
  OTPlen=6
  socket
  page: any=1;
  scrollUpDistance = 1000
  scrollDistance =100
  throttle = 200;
  constructor(
    private api: ApiService,
    private route:ActivatedRoute,
    private router :Router,
    private toastr :ToastrService,
    private spineer: NgxSpinnerService,
    private socketService:SocketService,
    private fb:FormBuilder,
    // private snack :MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loggedInUserId= localStorage.getItem('userId')
    this.route.params.subscribe((res)=>{
      this.userId=res.id
      
    })
    this.socketService
    this.addComment=this.fb.group({
      comment:['',Validators.required]
    })

    this.isUser = localStorage.getItem('token')
    this.currentUserId=localStorage.getItem('userId')
    this.checkUser()
   
  }

  passIndex(i){
    this.postIndex=i
  }



  checkUser() {
    if (this.isUser) {
      this.getPosts()
      window.scroll(0,0)
      // this.getUser()
    } else {
      this.router.navigate([''])
    }
  }

  getPosts() {
    this.spineer.show()
    this.api.getallPosts({ page : this.page , count :50  , userId : this.loggedInUserId}).subscribe((res) => {
      if(res['success']==true){
        this.allPosts = res['data']
        this.isPosts=this.allPosts.length  
        this.spineer.hide()
      }
      else{
        this.spineer.hide()
      }
    })
  }




  likePost(post,i){
    let data ={
      postId:post._id,
      likedBy:this.currentUserId,
      isLiked : post.isLiked ? false : true
    }
    this.spineer.show()
    this.api.likePost(data).subscribe((res)=>{
      if(res['success']==true){
        this.allPosts[i].isLiked =  !post.isLiked
        if(this.allPosts[i].isLiked){
          this.allPosts[i].likes++
        }else{
          this.allPosts[i].likes--
        }
        this.spineer.hide()
      }else{
        this.toastr.warning(res['data'])
        this.spineer.hide()
      }
    })
  }
  dislikePost(post,i){
    let data = {
      postId:post._id,
      dislikedBy:this.currentUserId
    }
    this.spineer.show()
    this.api.disLikePost(data).subscribe((res)=>{
      if(res['success']==true){
        this.spineer.hide()
        this.toastr.success(res['data'])
        // this.getPostDetails(post._id,i)
        // this.getPosts()
      }if(res['success']==false){
        this.spineer.hide()
        this.toastr.warning(res['data'])
        this.getPosts()
      }
    })
  }

  // getPostDetails(id,i){
  //   let data={
  //     postId:id
  //   }
  //   this.api.getOnepost(data).subscribe((res)=>{
  //    if(res['success']==true){
  //     this.allPosts[i] =res['data']
  //      this.userPost= res['data'].postedBy._id
  //    }
  //   })
  // }
  submit(id , i){
    let data={
      postId:id,
      comment:this.addComment.value.comment,
      commentBy:this.loggedInUserId
    }
    this.api.commentOnPost(data).subscribe((res)=>{
      if(res['success']==true){
        this.addComment.reset()
        this.allPosts[i].comments++
      }
    })
  }
  // onScroll(){
  //   console.log('hey')
  //   this.page++
  //   this.getPosts()
  // }

}
