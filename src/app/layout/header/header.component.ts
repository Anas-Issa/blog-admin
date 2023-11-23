import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /**
   *
   */
  user:any;
isLoggedIn$ : Observable<boolean> | undefined;
  constructor(private auth:AuthService) {
    
    
  }
  ngOnInit(): void {
  this.user=  JSON.parse(localStorage.getItem('user')||'').email;
 this.isLoggedIn$= this.auth.isLoggedIn();
  }
onLogout(){
  this.auth.logout();
}
}
