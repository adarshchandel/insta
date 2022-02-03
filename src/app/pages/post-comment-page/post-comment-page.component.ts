import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import {ActivatedRoute,Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder,FormGroup, Validators } from '@angular/forms'
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-post-comment-page',
  templateUrl: './post-comment-page.component.html',
  styleUrls: ['./post-comment-page.component.scss']
})
export class PostCommentPageComponent implements OnInit {
  postData: any=[];
  loggedInUserId: string;
  postId: any;
  commentsList:any;
  imgUrl = 'http://localhost:8000/static/';
  addComment:any
  constructor(
    private api: ApiService,
    private route :ActivatedRoute,
    private router:Router,
    private spinner :NgxSpinnerService,
    private fb:FormBuilder,
    private toastr :ToastrService
  ) { 

  }

  ngOnInit(): void {
    this.loggedInUserId= localStorage.getItem('userId')
    this.route.params.subscribe((res)=>{
      this.postId=res.id
    })

    this.getPost()
  }


  getPost(){
    let data={
      postId:this.postId
    }
    this.spinner.show()
    this.api.getOnepost(data).subscribe((res)=>{
     if(res['success']==true){
      this.spinner.hide()
       this.postData =res['data']
       this.commentList()
     }else{
      this.spinner.hide()
     }
    })
  }

  commentList(){
    let data = {
      postId : this.postId
    }
    this.api.getCommentsList(data).subscribe((res)=>{
      if(res['success']==true){
        this.commentsList=res['data']
      }

    })
  }

  likePost(post){
    let data ={
      postId:post._id,
      likedBy:this.loggedInUserId
    }
    this.spinner.show()
    this.api.likePost(data).subscribe((res)=>{
      if(res['success']==true){
        this.spinner.hide()
        // this.snack.open(res['data'])
        // this.toastr.success(res["data"])
        // this.getPosts()
        // this.getPostDetails(post._id,i)
      }if(res['success']==false){
        this.toastr.warning(res['dat-a'])
        // this.getPosts()
        this.spinner.hide()
      }
    })
  }

  submit(){
    let data={
      postId:this.postId,
      comment:this.addComment,
      commentBy:this.loggedInUserId
    }
    this.api.commentOnPost(data).subscribe((res)=>{
      if(res['success']=true){
        this.addComment=''
        this.commentList()
      }
    })
  }

  

}

