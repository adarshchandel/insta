import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api.service';
import { SocketService } from '../../socket.service'
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval, observable, Observable } from 'rxjs';
import {PeerConnectOption , PeerJSOption} from  'peerjs' 
  
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {
  user: any;
  myUser: any = [];
  userId: any;
  userList: any
  message: any

  imgUrl = 'http://localhost:8000/static/';
  receiver: any;
  element: HTMLLIElement;
  isUserTyping: any;
  messageList: any=[];
  eleArr: any=[];
  scrollUpDistance = 1000
  scrollDistance =1000
  throttle = 10;
  page: any=1;
  totalMessageCount: boolean=true;
  pushRes: any=[];

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketService,
    private spinner: NgxSpinnerService

  ) {}

  params = {
    sender: localStorage.getItem('userId')

  }
  ngOnInit(): void {

    this.userId = localStorage.getItem('userId')
    this.checkUser()
    this.allUser()
   
    // this.setupSocketConnection()
    // this.checkOut()
    setTimeout(() => {
      this.setConnection()
      this.addVideo
      
    }, 2000);


  }
  onScroll(){ 
    console.log('hey',this.totalMessageCount)
    this.page = this.page+1
    if(this.totalMessageCount){
      setTimeout(() => {
        this.messages()
      }, 2000);
    }
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
        
      } else {
        this.spinner.hide()
      }
    })
  }

  allUser() {
    this.service.MyfrindsList(this.userId).subscribe((res: any) => {
      if (res.success == true) {
        this.userList=  res['data'].friends
          window.scroll(0,0)
      }
    })
    // console.log('fjfjfjjf')
    // this.socketService.userList().subscribe((res)=>{
    //   console.log('===res===',res)
    // })
  }

  setConnection() {
    this.newMessage()
    this.getTyping()
    // this.allUser()
  }

  newMessage(){
    this.socketService.getMessage().subscribe((res)=>{
      console.log('new message=>>',res)
      // this.messageList 
        this.element = document.createElement('li');
        this.eleArr.push(this.element)
        this.element.innerHTML = ` ${res.message} <small>${new Date(res.time).toLocaleTimeString('en-US',{hour12:true,hour:'numeric',minute:'numeric'})}</small>`

        this.element.classList.add('msg_incomming')
          document.getElementById('message-list')?.appendChild(this.element)     
          this.scroll()
    })

  }



  SendMessage() {
    let data = {
      receiver: this.receiver,
      message: this.message,
      sender: this.userId,
      time : Date.now()

    }

    this.socketService.sendMessage(data)

    this.element = document.createElement('li');
    this.eleArr.push(this.element)

    this.element.innerHTML = `<small>${ new Date(Date.now()).toLocaleTimeString('en-US',{hour12:true,hour:'numeric',minute:'numeric'})}</small> ${this.message}`

    this.element.classList.add('msg_outgoing')
    document.getElementById('message-list').appendChild(this.element)
    this.message = ''
    this.scroll()
  }

  getChatUser(id) {
    this.receiver = id
    let data = {
      id: id
    }
    this.service.getUserById(data).subscribe((res: any) => {
      if (res['success'] == true) {
        this.user = res.data
        this.pushRes=[]
        this.page =1
        this.messages()
        

      }
    })
  }

  showTyping(e){
    if(e.target.value){
      this.socketService.userTyping({userName : this.myUser.userName , typing:true , toUser : this.user._id} )
    }
  }

  getTyping(){
    this.socketService.getUserTyping().subscribe((res)=>{
      this.isUserTyping = res
      setTimeout(() => {
          this.isUserTyping['typing'] = false
      }, 3000);
    })
  }
  
  messages(){
    let data ={
      receiver: this.receiver,
      sender: this.userId,
      page :this.page,
      count :20
    }

    this.service.getConvo(data).subscribe((res)=>{
      if(res['success']==true){

        setTimeout(() => {
          this.scroll()
        }, 100);
         this.messageList = []
        this.pushRes.push(...res['data'])
        console.log('pushRes==>>',this.pushRes)
        // this.pushRes

        console.log(this.pushRes.length , res['totalCount'])
        

        let groupArrays
          const grouper = this.pushRes.reduce((groups, con) => {
            const date = new Date(con.time).toDateString()
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(con);
            return groups;
          }, {});
          console.log('grouper',grouper)
           groupArrays = Object.keys(grouper).map((date) => {
            return {
              date,
              message: grouper[date]
            };
          });
          console.log('groupArrays',groupArrays)

          groupArrays.map((res)=>{
            res.message.reverse()
            this.messageList.push(res)
          })

        // this.messageList.unshift(...groupArrays)
          this.messageList.reverse()
        console.log('messageList==>>',this.messageList)
        if(this.pushRes.length >= res['totalCount']){
          this.totalMessageCount = false
          return
        }else{
          this.totalMessageCount = true
        }
      }
    })
  }
  scroll(){
    let objDiv = document.getElementById("messages_cus");
       objDiv.scrollTop = objDiv.scrollHeight; 
  }

  voiceCall(id){
    console.log(id)
    let myVideo = document.createElement('video') // Create a new video tag to show our video
    myVideo.muted = true 
    navigator.mediaDevices.getUserMedia({ video : true , audio :true }).then((stream)=>{
      this.socketService.outgoingVoiceCall({receiver : id , caller : this.userId})
        console.log('stream==>',stream)
          // myVideo = (stream)
        // myVideo = stream
        // this.addVideo(myVideo , stream)
    })
  }

  addVideo( ){
    this.socketService.incomingVoiceCall().subscribe((res)=>{
      console.log('res==>>',res)
    })

  }




//   navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
// }).then(stream => {
//     addVideoStream(myVideo, stream) // Display our video to ourselves

//     myPeer.on('call', call => { // When we join someone's room we will receive a call from them
//         call.answer(stream) // Stream them our video/audio
//         const video = document.createElement('video') // Create a video tag for them
//         call.on('stream', userVideoStream => { // When we recieve their stream
//             addVideoStream(video, userVideoStream) // Display their video to ourselves
//         })
//     })

//     socket.on('user-connected', userId => { // If a new user connect
//         connectToNewUser(userId, stream) 
//     })
// })

}
