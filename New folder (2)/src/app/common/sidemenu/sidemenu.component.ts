import { Component, OnInit, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  @Input() page;
  name: string;
  utype: any;
  usertype: string;
  gender = localStorage.getItem('gender');
  img: string;
  dp = localStorage.getItem('dp');
  role;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getRole();
    this.utype = localStorage.getItem('utype');
    this.name = localStorage.getItem('name');
    if (this.utype == 'adm') { this.usertype = "Admin"; }
    else if (this.utype == 'stf') { this.usertype = "Staff"; }
    else if (this.utype == 'std') { this.usertype = "Student"; }
    console.log(localStorage.getItem('name'));


    if (this.dp != '' && this.dp != 'null') {
      this.img = "http://www.raghuerp.in/server/img/dps/" + this.dp;
    }
    else {
      if (this.gender == 'M') {
        this.img = "http://www.raghuerp.in/server/img/dps/M.png";
      }
      else if (this.gender == 'F') {
        this.img = "http://www.raghuerp.in/server/img/dps/F.png";
      }
      else {
        this.img = "http://www.raghuerp.in/server/img/dps/no_dp.jpg";
      }
    }
  }

  getRole() {
    this._apiService.getRole().subscribe(data => {
      if (data.data.success) {
        this.role = data.data.role;
      }
    });
  }

}
