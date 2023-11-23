import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
loggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
isLoggedInGuard:boolean=false;
  constructor(private fireAuth:AngularFireAuth, private toastr:ToastrService,
    private router:Router) { }

  login(email:any,password:any){
    this.fireAuth.signInWithEmailAndPassword(email,password)
    .then((logRef)=>{
      this.toastr.success('Logged In Successfully');
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard=true;
      this.router.navigate(['/'])
    }).catch(e=>{
      this.toastr.warning(e);
    })
  }
  loadUser() { 
    this.fireAuth.authState.subscribe(user=>{
      localStorage.setItem('user',JSON.stringify(user))
    })
  }
  logout()  { 
     this.fireAuth.signOut().then(()=>{

      this.toastr.success('User Logged Out Successfully');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard=false;
      this.router.navigate(['/login']);
     })
  }
  isLoggedIn() { 
    return this.loggedIn.asObservable();
  }
}
