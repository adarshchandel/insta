import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allPosts:any={}
  user:boolean=false;
  isUser:any;
  constructor(
    private api:ApiService,
    private router :Router
  ) { }

  ngOnInit(): void {
    let user = localStorage.getItem('token');
    if(user){
      this.router.navigate(['/feed'])
    }
    
  }

}
