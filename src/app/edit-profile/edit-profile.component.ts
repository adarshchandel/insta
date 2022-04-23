import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import {ActivatedRoute,Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr'
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  profileUserId: any;
  user: any;
  profileForm:FormGroup
  imgUrl = 'http://localhost:8000/static/';
  submitted=true
  flags={
    isSignup:false
  }
  profilePic: any;
  image: any;
  updatedImage: any;
  imageChangedEvent: any;
  croppedImage: string;
  fileToReturn: any;

  constructor(
    private api:ApiService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private spinner :NgxSpinnerService,
    private toastr :ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res)=>{
      this.profileUserId=res.id
    })
    this.profileForm=this.fb.group({
      userName:['',Validators.required],
      email:['',[Validators.required,Validators.pattern(/([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?/)]]
    })
    this.getUser()
  }

  // imageUpload(event){
  //   console.log(event)
  //   this.image=event.target.files[0]
  //   var reader= new FileReader();
  //   reader.onload=(event:any)=>{
  //     let result =event.target.result
  //     this.updatedImage = result
  //   }
  //   reader.readAsDataURL(this.image)
  // }

  imageUpload(event: any): void {
    this.imageChangedEvent = event;
    if(event.target.files){
      document.getElementById('open-dialog').click()
    }
}

imageCropped(event:ImageCroppedEvent){

  this.croppedImage=event.base64
   this.fileToReturn = this.base64ToFile(
    event.base64,
    this.imageChangedEvent.target.files[0].name,
  )
  console.log(this.fileToReturn) 

}

imageLoaded() {
  // show cropper
}
cropperReady() {
  // cropper ready
}
loadImageFailed() {
  // show message
}

base64ToFile(data, filename) {

  const arr = data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}



  get status() { 
    return this.profileForm.controls
  }

  getUser() {
    let data={
      id:this.profileUserId
    }
    this.spinner.show()
    this.api.getUserById(data).subscribe((res: any) => {
      if(res['success']==true){
        this.spinner.hide()
        this.profileForm.patchValue(res['data'])
        this.profilePic=res['data'].profilePic
      }else{
        this.spinner.hide()
      }

    })
  }

  submit(){

    if(this.profileForm.valid){
      let fd= new FormData()

      fd.append('userName',this.profileForm.value.userName)
      fd.append('email',this.profileForm.value.email)
      if(this.fileToReturn){
       fd.append('profilePic',this.fileToReturn)
       // this.profileForm.value.image=this.profilePic
      }else{
       fd.append('profilePic',this.profilePic)
      }
      fd.append('id',this.profileUserId)
   
      this.spinner.show()
      this.api.updateProfile(fd).subscribe((res)=>{
         if(res['success']==true){
           this.toastr.success('profile update successfully')
           this.spinner.hide()
           let newData = {
             data:res['data']
           }
          this.api.setUserData(newData)
          this.router.navigate(['profile/'+this.profileUserId])
         }else{
           this.spinner.hide()
         }
       })
    }
  }

}
