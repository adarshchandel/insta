import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-comment-page',
  templateUrl: './post-comment-page.component.html',
  styleUrls: ['./post-comment-page.component.scss']
})
export class PostCommentPageComponent implements OnInit {
  postData: any = [];
  loggedInUserId: string;
  postId: any;
  commentsList: any = [];
  imgUrl = 'http://localhost:8000/static/';
  addComment: any
  userData: any;
  commentArr: any = [];
  replyComment: any
  count: number =3;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.loggedInUserId = localStorage.getItem('userId')
    this.userData = JSON.parse(localStorage.getItem('userData'))
    this.route.params.subscribe((res) => {
      this.postId = res.id
    })

    this.getPost()
  }


  getPost() {
    let data = {
      postId: this.postId
    }
    this.spinner.show()
    this.api.getOnepost(data).subscribe((res) => {
      if (res['success'] == true) {
        this.spinner.hide()
        this.postData = res['data']
        this.commentList()
      } else {
        this.spinner.hide()
      }
    })
  }

  commentList() {
    let data = {
      postId: this.postId
    }
    this.api.getCommentsList(data).subscribe((res) => {
      if (res['success'] == true) {
        this.commentsList = res['data']
      }

    })
  }

  likePost(post) {
    let data = {
      postId: post._id,
      likedBy: this.loggedInUserId
    }
    this.spinner.show()
    this.api.likePost(data).subscribe((res) => {
      if (res['success'] == true) {
        this.spinner.hide()
        // this.snack.open(res['data'])
        // this.toastr.success(res["data"])
        // this.getPosts()
        // this.getPostDetails(post._id,i)
      } if (res['success'] == false) {
        this.toastr.warning(res['dat-a'])
        // this.getPosts()
        this.spinner.hide()
      }
    })
  }

  submit() {
    let data = {
      postId: this.postId,
      comment: this.addComment,
      commentBy: this.loggedInUserId
    }
    this.api.commentOnPost(data).subscribe((res) => {
      if (res['success'] = true) {
        let data = {
          comment: this.addComment,
          commentedBy: {
            id: this.loggedInUserId,
            profilePic: this.userData.profilePic,
            userName: this.userData.userName
          }
        }
        this.commentsList.unshift(data)
        this.addComment = ''
      }
    })
  }

  cmntInput(i) {
    this.replyComment = ''
    if (this.commentArr.includes(i)) {
      this.commentArr = []
    } else {

      this.commentArr.splice(0, 1, i)
    }
  }

  commentReply(i, cmntId) {
    let data = {
      commentId: cmntId,
      commentedBy: this.loggedInUserId,
      reComment: this.replyComment
    }
    this.api.commentReply(data).subscribe((res) => {
      if (res['success']) {
        let insertObj = {
          _id: res['data'],
          reComment: this.replyComment,
          rplyBy :{
            id: this.loggedInUserId,
            profilePic: this.userData.profilePic,
            userName: this.userData.userName

          }
        }
        this.commentsList[i].reComments.unshift(insertObj)
        this.commentsList[i].recomment++
        this.replyComment = ''
        console.log(this.commentsList[i])
      }
    })
  }

  getReplies(i, cmntId , page) {
    console.log(this.commentsList[i])
    this.api.replyList({ commentId: cmntId , page : parseInt(page)  , count : this.count }).subscribe((res) => {
      if (res['success']) {
        this.commentsList[i].reComments.push(...res['data'])
        this.commentsList[i].replyPage++

        // this.commentsList[i].recomment =  this.commentsList[i].recomment-this.count
        console.log(this.commentsList[i])
        console.log(this.commentsList[i].recomment ,this.count)

      }
    })

  }
  hideReply(i){
    this.commentsList[i].reComments = [] 
    this.commentsList[i].replyPage =1

  }


}

