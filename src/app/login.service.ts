import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginViewModel } from './login-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserName: string = null;
  constructor(private httpclient: HttpClient, private httpBackend: HttpBackend) { }

  login(loginviewmodel: LoginViewModel): Observable<LoginViewModel> {
    this.httpclient = new HttpClient(this.httpBackend);
    return this.httpclient.post<LoginViewModel>("/api/login", loginviewmodel, { responseType: "json", observe: "response" })
      .pipe(
        map(
          (response => {
            if (response) {
              this.currentUserName = response.body.userName;
             // sessionStorage.currentUser = JSON.stringify(response.body);
              //sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");

            }
            return response.body;
          })));
  }
  logout() {
    sessionStorage.removeItem("userName");
    this.currentUserName = null;
  }
}
