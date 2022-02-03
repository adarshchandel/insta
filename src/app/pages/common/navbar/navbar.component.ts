import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../api.service'

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
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.userId=localStorage.getItem('userId')
    this.fun()

  }
  fun(){
    const isLoggedIn =  localStorage.getItem('token')
    if(isLoggedIn){
      this.displayElement=true;
      console.log(`user logged in `)
      this.getUser()
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
    })

    this.api.setProfileData().subscribe(res=>{
      if(res && res['data']){
        this.userData=res['data']
        console.log('this.userData',this.userData)
      }
      })
  }


  logOut(){
    localStorage.clear()
    this.isAcive= localStorage.getItem('token')
    if(!this.isAcive){
      this.router.navigate(['login'])
    }
   
  }
  

}
