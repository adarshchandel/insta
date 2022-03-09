import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  socket: any
  loggedInUserId: string;
  constructor(
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.loggedInUserId = localStorage.getItem('token')
    console.log(this.loggedInUserId)

  }




  setConnection(user: any) {
    this.socket = io(environment.baseUrl)
    this.socket.emit('connection')
    this.socket.emit('login', { id: user._id, name: user.userName })
  }

  sendMessage(data: any) {
    this.socket.emit('message', data)
  }

  getMessage(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('send-message', (message) => observer.next(message))
    })
  }

  userTyping(data: any) {
    this.socket.emit('typing', data)
  }
  getUserTyping(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('showTyping', (typing) => observer.next(typing))

    })
  }

  notifyUser(data) {
    this.socket.emit('setNotify', data)
  }
  getNotification(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('getNotify', (notify) => observer.next(notify))
    })
  }

  outgoingVoiceCall(data) {
    this.socket.emit('videoCall', data)
  }
  
  incomingVoiceCall(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('incomingCall', (call) => observer.next(call))
    })
  }

  // userList():Observable<any>{
  //   return new Observable((observer)=>{
  //     this.socket.on('userList',(users)=> observer.next(users))
  //   })
  // }


  disconnect(id) {
    if (this.socket) {
      this.socket.emit('userGone' , { id : id})
      this.socket.disconnect();

    }
  }


  // **init connection**
  // this.socket.emit('connection')
  // this.socket.emit('login',this.userId)
  // console.log('this.socket',this.socket)

  // notification(data){
  //   const headers = new HttpHeaders();
  //   return this.http.post(this.baseUrl+'/send-notification',data,{headers:headers})
  // }
}
