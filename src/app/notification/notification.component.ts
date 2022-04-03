import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  userData: any;

  constructor() { }

  ngOnInit(): void {
    this.userData = JSON.parse( localStorage.getItem('userData') )
  }

}
