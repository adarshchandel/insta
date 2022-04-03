import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { FeedComponent } from './feed/feed.component'
import { MessagesComponent } from './pages/messages/messages.component'
import { ForgetPasswordComponent } from './forget-password/forget-password.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { PostCommentPageComponent } from './pages/post-comment-page/post-comment-page.component'
import { AdminGuard } from '../app/admin.guard'
import { NotificationComponent } from './notification/notification.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'create',
    component: CreatePostComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'inbox',
    component: MessagesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AdminGuard]
  }, {
    path: 'update-profile/:id',
    component: EditProfileComponent,
    canActivate :[AdminGuard]
  },
  {
    path: 'post/:id',
    component: PostCommentPageComponent,
    canActivate :[AdminGuard]
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate :[AdminGuard]
  },
  {
    path:'test',
    component:TestComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
