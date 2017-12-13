import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, Input } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ApiService } from 'app/services/api.service';
import { ModalModule } from "ngx-modal";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { GenericValidator } from '../generic-validator';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  gender = localStorage.getItem('gender');
  img: string;
  dp = localStorage.getItem('dp');
  @Input() page;
  name: string;
  utype: string;
  usertype: string;
  // master_role: string;
  currentRole: string;
  // currentrole: string;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    console.log(this.page, 'page');

    this.utype = localStorage.getItem('utype');
    // this.currentrole = localStorage.getItem('currentrole');
    this.name = localStorage.getItem('name');

    if (this.dp != '' && this.dp != 'null') {
      this.img = "http://210.16.79.137/raghuerp/server/img/dps/" + this.dp;
    }
    else {
      if (this.gender == 'M') {
        this.img = "http://210.16.79.137/raghuerp/server/img/dps/M.png";
      }
      else if (this.gender == 'F') {
        this.img = "http://210.16.79.137/raghuerp/server/img/dps/F.png";
      }
      else {
        this.img = "http://210.16.79.137/raghuerp/server/img/dps/no_dp.jpg";
      }
    }

    this.getassignedrole();
  }

  getassignedrole() {
    console.log('assigned');
    const dashboardData = {};
    dashboardData['reg_no'] = localStorage.getItem('reg_no');
    dashboardData['utype'] = localStorage.getItem('utype');
    this._apiService.getassignedrole(dashboardData).subscribe(data => {
      console.log(data.data.success, data.success, 'success');
      if (data.data.success == true && data.data.data.role == 'placement_officier') {
        this.currentRole = data.data.data.role;
        console.log(this.currentRole, 'currentrole');
        localStorage.setItem('currentrole', this.currentRole);
      }
      else if (data.data.success == true && data.data.data.role == 'hod') {
        this.currentRole = data.data.data.role;
        console.log(this.currentRole, 'currentrole');
        localStorage.setItem('currentrole', this.currentRole);
      }
      else if (data.data.success == true && data.data.data.role == 'asst_hod') {
        this.currentRole = data.data.data.role;
        console.log(this.currentRole, 'currentrole');
        localStorage.setItem('currentrole', this.currentRole);
      }
      else if (data.data.success == false) {
        this.currentRole = "adm";
        console.log(this.currentRole, 'currentrole');
        localStorage.setItem('currentrole', this.currentRole);
      }
    });
  }


}
