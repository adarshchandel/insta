import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './pages/posts/posts.component';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/common/navbar/navbar.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import {ToastrModule} from 'ngx-toastr';
import { FeedComponent } from './feed/feed.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ImageCropperModule } from 'ngx-image-cropper';
// import {hammerjs};
// import {ImageCropperModule} from 'ngx-img-cropper';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import {ReactiveFormsModule} from '@angular/forms'
import {AdminGuard} from './admin.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PostCommentPageComponent } from './pages/post-comment-page/post-comment-page.component'
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    CreatePostComponent,
    FeedComponent,
    MessagesComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    EditProfileComponent,
    PostCommentPageComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    NgxSpinnerModule,
    ImageCropperModule,
    ReactiveFormsModule
    
    
    
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
