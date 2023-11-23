import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  /**
   *
   */
  constructor(private auth:AuthService, private router:Router,private toastr:ToastrService) {
   
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
   
      if(this.auth.isLoggedInGuard){
        return true;
      }
      else { 
        this.toastr.warning('You do not have prmission to accss this page');
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
