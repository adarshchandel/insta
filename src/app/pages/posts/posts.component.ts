import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
allPosts:any;
  constructor(
    private api :ApiService
  ) { }
  

  ngOnInit(): void {
  }
  getPosts(){
    this.api.getallPosts().subscribe((res)=>{
      
      this.allPosts =res['data']
      console.log(this.allPosts)
    })
  }
  

}
