import { Component, OnInit } from '@angular/core';
import  {ApiService} from '../api.service'
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner'
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm:FormGroup
  constructor(
    private apiService :ApiService,
    private fb : FormBuilder,
    private toastr :ToastrService,
    private spinner :NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.forgetForm= this.fb.group({
      email:['',Validators.required]
    })
  }


  onSubmit(){
    this.spinner.show()
    this.apiService.forgetPassword(this.forgetForm.value).subscribe((res)=>{
      console.log(res)
      if(res['success']==true){
        setTimeout(() => {
          this.spinner.hide()
          this.toastr.success(res['data'])
          // this.forgetForm.reset()
        }, 1500);
      }
      else if(res['success']==false){
        this.toastr.error(res['data'])
        this.spinner.hide()
      }
    })
  }

}
