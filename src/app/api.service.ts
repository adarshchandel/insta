import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {BehaviorSubject ,} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:string='http://localhost:8000/v1/';
  cloudiUrl:string='https://api.cloudinary.com/v1_1/dw7w5aqso/';
  public profileData:BehaviorSubject<object> = new BehaviorSubject<object>({})
  // public headerData: BehaviorSubject<object> = new BehaviorSubject<object>({});
  constructor(
    private http:HttpClient
  ) {}




  

  userSignup(data){
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl+'user/signup',data,{headers:headers});
    
  }

  isUserLogin(){
  return localStorage.getItem('token')
  }

  userLogin(data){
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl+'user/login',data,{headers:headers});
  }

  // getUser(data){
  //   const headers = new HttpHeaders({
  //     "Authorization": "Bearer "+localStorage.getItem("token")});
  //   return this.http.get(this.baseUrl+'user/getLoggedInUser/'+data,{headers:headers})
  // }
  updateProfile(data){
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl+'user/updateUserProfile',data,{headers:headers})
  }

  getUserById(data:any){
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+localStorage.getItem("token")})
    return this.http.post(this.baseUrl+'user/getUserById',data,{headers:headers})

  }
  setUserData(value){
    console.log('value',value)
    this.profileData.next(value);
  }

  setProfileData(){
    return this.profileData.asObservable()
  }

  createPost(data:any){
    const headers = new HttpHeaders(
      { "Authorization": "Bearer "+localStorage.getItem("token")});
    return this.http.post(this.baseUrl+'post/createPost',data,{headers:headers})
  }

  getMyPosts(data){
    const headers =new HttpHeaders({
      "Authorization": "Bearer "+localStorage.getItem("token")});
    return this.http.post(this.baseUrl+'post/myPosts',data, {headers:headers});
  }
   
  // getUserPosts(data:any){
  //   const headers =new HttpHeaders({
  //     "Authorization": "Bearer "+localStorage.getItem("token")});
  //     return this.http.get(this.baseUrl+'post/userPosts/'+data)
  // }
  getallPosts(){
    const headers = new HttpHeaders();
    return this.http.get(this.baseUrl+'post/allPosts',{headers:headers});
  }

  getOnepost(data){
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl+'/post/postData',data,{headers:headers})
  }
  deletePost(postId){
    const headers = new HttpHeaders({
      "Authorization": "Bearer "+localStorage.getItem("token")});
    return this.http.post(this.baseUrl+"post/deletePost",postId,{headers:headers})
    
  }
  likePost(data:any){
    const headers = new HttpHeaders({
      "Authorization" : "Bearer "+localStorage.getItem("token")
    })
    return this.http.put(this.baseUrl+'post/addLike',data,{headers:headers})
  }
  disLikePost(data:any){
    const headers = new HttpHeaders({
      "Authorization" : "Bearer "+localStorage.getItem("token")
    })
    return this.http.put(this.baseUrl+'post/addDisLike',data,{headers:headers})
  }
  MyfrindsList(){
    const headers =new HttpHeaders();
    return this.http.get(this.baseUrl+'user/myUserList',{headers:headers})
  }
  forgetPassword(data:any){
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl+'user/forget-password',data,{headers:headers})
  }

  followUser(data){
    const headers = new HttpHeaders( {
        "Authorization" : "Bearer "+localStorage.getItem("token")
      });
      return this.http.post(this.baseUrl+'user/follow',data,{headers:headers})
  }
  unFollowUser(data){
    const headers = new HttpHeaders( {
        "Authorization" : "Bearer "+localStorage.getItem("token")
      });
      return this.http.post(this.baseUrl+'user/unfollow',data,{headers:headers})
  }

  commentOnPost(data){
    const headers = new HttpHeaders({
      "Authorization" : "Bearer "+localStorage.getItem("token")
    })
    return this.http.post(this.baseUrl+'post/comment',data,{headers:headers})
  }

  getCommentsList(data){
    const headers = new HttpHeaders({
      "Authorization" : "Bearer "+localStorage.getItem("token")
    })
    return this.http.post(this.baseUrl+'post/commentsList',data,{headers:headers})
  }
}

