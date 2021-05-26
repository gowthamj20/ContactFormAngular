import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(public loginService:LoginService) { }
  ngOnInit(): void {
    console.log(this.loginService.currentUserName);
  }
 
  
}

