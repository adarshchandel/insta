import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService } from 'ngx-spinner'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = {}
  flags={
    isLogIn:false,
  }
  fieldTextType: boolean;
  Show: boolean=true;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private spinner :NgxSpinnerService

  ) { }

  ngOnInit(): void {

  }
  submitLogin() {
    let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    this.flags.isLogIn=true
    if (!this.login.email || !this.login.password || !regex.test(this.login.email)) {
      this.flags.isLogIn=false
      this.toastr.error('enter valid details')
      return
      
    }
    else {
      this.spinner.show()
      this.api.userLogin(this.login).subscribe((res: any) => {
        if (res.success == true) {
          localStorage.setItem("token", res.data[0].token);
          localStorage.setItem("userId", res.data[0]._id)
          localStorage.setItem('userData', JSON.stringify(res.data[0].userData))
          this.toastr.success('User logged in')
          this.router.navigate(['/feed'])
          this.spinner.hide()

        } else {
          this.toastr.error(res.data)
          this.flags.isLogIn=false
          this.spinner.hide()

        }
      })
    }
  }

  showPassword(){
    this.fieldTextType = !this.fieldTextType;
    if(this.fieldTextType){
      this.Show=false
    }else{
      this.Show=true
    }
  }
  
}
