import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import 'rxjs/add/operator/map';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthenticationService {
  public userLoggedIn: boolean = false;

  constructor(private http: Http, private _apiService: ApiService) { }

  login(username: string, password: string) {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const body = {
            'username': username,
            'password': password, 
        };  

    return this.http.post(AppSettings.LOGIN_API, body, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        console.log(user);
        if (user && user.token) {
          localStorage.setItem('currentUser', user.token);
          localStorage.setItem('name', user.name);
          localStorage.setItem('utype', user.utype);
          localStorage.setItem('reg_no', user.reg_no);
          localStorage.setItem('dp', user.dp);
          localStorage.setItem('gender', user.gender);
          localStorage.setItem('master_role', user.master_role);
          localStorage.setItem('college', user.college);
          localStorage.setItem('dept', user.dept);
          localStorage.setItem('course', user.course);
          localStorage.setItem('branch', user.branch);
          this.userLoggedIn = true;
        } else {
          this.userLoggedIn = false;
          console.log("Authentication Fails");
        }

      }); 
  }

  logout() {
    localStorage.clear();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('name');
    localStorage.removeItem('utype');
    localStorage.removeItem('reg_no');
    localStorage.removeItem('dp');
    localStorage.removeItem('gender');
    localStorage.removeItem('master_role');
    localStorage.removeItem('college');
    localStorage.removeItem('dept');
    localStorage.removeItem('branch');
    localStorage.removeItem('course');
  }

}
