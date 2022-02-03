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

  getMessage():Observable<any> {
    return new Observable<any>((observer)=>{
      this.socket.on('send-message', (message)=>observer.next(message))
    })
  }

  disconnect() {
    if (this.socket) {
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
