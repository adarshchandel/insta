import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup: any = {}
  imgUrl:any
  image:any;
  flags={
    isSignup:false
  }
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  imageUpload(event) {
    if(event.target.files[0])
    this.image =event.target.files[0]
    var reader= new FileReader();
    reader.onload=(event:any)=>{
      let result =event.target.result
      this.imgUrl = result
      
    }
    reader.readAsDataURL(this.image)
  }

  submitSignup() {
    let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let pattern=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    this.flags.isSignup=true
    if (!this.signup.name || !this.signup.email || !this.signup.password || !regex.test(this.signup.email) || this.signup.number.length>10 || this.signup.number.length<10 || !this.image) {
      this.flags.isSignup=false
      return this.toastr.error('Please enter valid details')
      

    }else{
      console.log(this.image)
      const fd = new FormData();
      fd.append('name',this.signup.name)
      fd.append('email',this.signup.email)
      fd.append('number',this.signup.number)
      fd.append('password',this.signup.password)
      fd.append('profilePic',this.image)
      
      this.api.userSignup(fd).subscribe((res: any) => {
        console.log(res)
        if (res.success == true) {
          
          this.toastr.success(`successfully signup `)
          this.router.navigate(['login'])
        }else{
          
          this.toastr.error(res.data)
          this.flags.isSignup=false
        }
      })
    }
  }
}
