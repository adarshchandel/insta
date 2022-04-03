import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { title } from 'process';
import {ApiService} from '../../../api.service'
import { SocketService } from '../../../socket.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  isLoggedIn:any;
  token:any;
  loggedin:any;
  displayElement:any;
  isAcive: string;
  user: any={};
  userId: any;
  userData: any=[];
  imgUrl = 'http://localhost:8000/static/';
  constructor(
    private router:Router,
    private api :ApiService,
    private route:ActivatedRoute,
    private socketService : SocketService
  ) { }

  ngOnInit(): void {

    this.userId=localStorage.getItem('userId')
    this.fun()
    this.getUser()
    
  }
  fun(){
    const isLoggedIn =  localStorage.getItem('token')
    if(isLoggedIn){
      this.displayElement=true;
      console.log(`user logged in `)
      
      this.router.navigate['/feed']
     
    }else{
      this.displayElement=false;
      console.log('user is not logged in')
    }
  }

  getUser() {
    let data={
      id:this.userId
    }
    this.api.getUserById(data).subscribe((res: any) => {
      this.userData=res['data']
      this.setConnection(this.userData)

    })

    this.api.setProfileData().subscribe(res=>{
      if(res && res['data']){
        // this.getNotify()
        this.userData=res['data']
        console.log('this.userData',this.userData)
      }
      })
  }

  setConnection(user){
    this.socketService.setConnection(user)
    this.requestPermission()
    setTimeout(() => {
      this.getNotify()
    }, 1500);
  }

  

  logOut(){
    localStorage.clear()
    this.isAcive= localStorage.getItem('token')
    if(!this.isAcive){
      this.router.navigate(['login'])
      this.socketService.disconnect(this.userId)
    }
  }

  requestPermission(){
    Notification.requestPermission().then( (perm)=>{
      console.log('perm',perm)
      
    })
  }



  getNotify(){
    this.socketService.getNotification().subscribe((res)=>{
      new Notification('',{ body : res['mesage']})
    })
  }
  

}
