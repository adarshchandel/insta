import { Injectable ,OnInit} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from './api.service';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authApi:ApiService,
    private router : Router){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean 
    | UrlTree> 
    | Promise<boolean 
    | UrlTree> 
    | boolean |
     UrlTree {
       if(this.authApi.isUserLogin){
        return true;
       }else{
         this.router.navigate([''])
       }
  }
  
  
}
