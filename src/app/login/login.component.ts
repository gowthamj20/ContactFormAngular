import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { LoginViewModel } from '../login-view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData:LoginViewModel=new LoginViewModel();
  loginError:string="";
  constructor(private loginService:LoginService,private router:Router) { 
  }
  ngOnInit(): void {
  }
  onLoginClick(event)
  {
    console.log(event);
    this.router.navigateByUrl("/contact");
  }

} 
