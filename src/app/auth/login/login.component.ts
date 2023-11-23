import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   *
   */
  constructor(private auth:AuthService) 
  {
    
    
  }
onSubmit(loginForm:any){
  console.log(loginForm)
  this.auth.login(loginForm.value.email,loginForm.value.password);
}
}
