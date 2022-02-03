import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {Router,ActivatedRoute} from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {NgxSpinnerService} from 'ngx-spinner'
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CropperSettings ,ImageCropperComponent} from 'ngx-img-cropper';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  imgUrl='mongodb+srv://adarshChandel:sLpeSZlKcDMH5urh@cluster0.1cds7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  url:any;
  create:any;
  image:any;
  userId:any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imgurl: any;
  data: any;
  fileToReturn: File;

  constructor(
    private api:ApiService,
    private route :ActivatedRoute,
    private toastr :ToastrService,
    private router:Router,
    private spinner :NgxSpinnerService
   
  ) {

   }

  ngOnInit(): void {

    this.userId=localStorage.getItem('userId')

  }
  checkUser(){
    if(!this.userId){
      this.router.navigate([''])
    }
  }

  // imageUpload(event) {
  //   if(event.target.files[0])
  //   // this.imageChangedEvent=event
  //   this.image =event.target.files[0]
  //   var reader= new FileReader();
  //   reader.onload=(event:any)=>{
  //     let result =event.target.result
  //     this.imgurl = result
  //   }
  //   reader.readAsDataURL(this.image)
  // }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if(event.target.files){
      document.getElementById('open-dialog').click()
      event=null
    }
}

  imageCropped(event:ImageCroppedEvent){
    this.croppedImage=event.base64
     this.fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    )
    // return fileToReturn;

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




  createPost(){

    if( !this.fileToReturn && !this.create){
     return this.toastr.error('Upload image and caption')
    }else{
      let fd = new FormData();
      fd.append('caption',this.create?this.create:'')
      fd.append('image', this.fileToReturn)
      this.spinner.show()
      this.api.createPost(fd).subscribe((res:any)=>{
        if(res.success==true){
          this.spinner.hide()
          this.toastr.success('new post create')
          this.router.navigate(['/feed'])
        }else{
          this.spinner.hide()
          this.toastr.error(res['data'])
        }
      })
    }


  }
}


