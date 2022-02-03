import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { SocketService } from '../../socket.service'
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client'
import { NgxSpinnerService } from 'ngx-spinner';

const SOCKET_ENDPOINT = io('http://localhost:8000/');
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  user: any;
  myUser: any = [];
  userId: any;
  userList: any;
  socket;
  message: any
  text: string = 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availableIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availableIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availableIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availableIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availableIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availableIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available'

  imgUrl = 'http://localhost:8000/static/';
  receiver: any;
  activeUser: any = [];
  element: HTMLLIElement;
  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketService,
    private spinner: NgxSpinnerService

  ) {


  }

  params = {
    sender: localStorage.getItem('userId')

  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.checkUser()
    this.allUser()
    this.newMessage()
    // this.setupSocketConnection()
    // this.checkOut()
    // this.setConnection()
  }


  checkUser() {
    this.userId = localStorage.getItem('userId')
    if (this.userId) {
      this.getUser()
    } else {
      this.router.navigate([''])
    }
  }

  getUser() {
    let data = {
      id: this.userId
    }
    this.spinner.show()
    this.service.getUserById(data).subscribe((res) => {
      if (res['success'] == true) {
        this.myUser = res['data']
        this.spinner.hide()
        this.setConnection(this.myUser)
      } else {
        this.spinner.hide()
      }
    })
  }

  allUser() {
    this.service.MyfrindsList().subscribe((res: any) => {
      if (res.success == true) {
        this.userList = res.data
      }
    })
  }

  setConnection(user : any) {
    this.socketService.setConnection(user)
  }

  newMessage(){
    this.socketService.getMessage().subscribe((res)=>{
      console.log('new message=>>',res)
    })
  }

  // setupSocketConnection() {
  //   this.socket = this.socketService.setConnection();
  //   console.log('this.socket==>>',this.socket)
  //   this.socket.emit('connection')
  //   this.socket.emit("addUser", this.userId);
    // this.socket.on('message-broadcast', (data: any) => {
    //   console.log('incomming message', data)
    //   if (data) {

    //     this.element = document.createElement('li');
    //     //  let value =  data
    //     this.element.innerHTML = data.message;
    //     this.element.style.background = 'white';
    //     this.element.style.padding = '15px 30px';
    //     this.element.style.margin = '10px';
    //     if (this.element) {
    //       console.log('element', this.element);
    //       document.getElementById('message-list').appendChild(this.element);
    //       window.scrollTo(0,document.querySelector("messages_cus").scrollHeight);
    //     }
    //     var snd = new Audio("M24.mp3")
    //     snd.play()

    //   }
    // });
  // }

  // add(){
  //   document.getElementById('just').classList.add('new')  

  // }

  SendMessage() {
    let data = {
      receiver: this.receiver,
      message: this.message,
      sender: this.userId
    }

    this.socketService.sendMessage(data)

    // this.socket.emit('message', data);
    // const element = document.createElement('li');
    // element.innerHTML = this.message;
    // element.style.background = 'gray';
    // element.style.padding = '15px 30px';
    // element.style.margin = '10px';
    // element.style.textAlign = 'right';
    // document.getElementById('message-list').appendChild(element);
    // this.message = ''
  }

  getChatUser(id) {
    this.receiver = id
    let data = {
      id: id
    }
    this.service.getUserById(data).subscribe((res: any) => {
      if (res['success'] == true) {
        this.user = res.data
      }
    })
  }


}
