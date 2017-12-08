import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;
  error = false;
  error_message;
  data;
  role;
  reg_no = localStorage.getItem('reg_no');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.authenticationService.userLoggedIn = false;
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  checkLogin() {
    this.authenticationService.login(this.model.username, this.model.password).subscribe(data => {
      // this.getRole();
      this._apiService.getRole().subscribe(data => {
        if (data.data.success) {
          this.role = data.data.role;
          if (this.role == 'staff') {
            this.router.navigate(['/attendance']);
          }
          if (this.role != 'staff') {
            this.router.navigate(['/dashboard']);
          }
          console.log(this.role);
        }
      });
    }, error => {
      this.error = true;
      this.error_message = 'Invalid Credentials..!';
    });
  }
  getRole() {
    this._apiService.getRole().subscribe(data => {
      if (data.data.success) {
        this.role = data.data.role;
        console.log(this.role);
      }
    });
  }

}
