import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IMyDpOptions, IMyDateModel, IMyOptions, IMyDate } from 'mydatepicker';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  master_role;
  utype;
  d = new Date();
  stdate;
  eddate;
  collegdepts = [];
  attendance = [];
  mondata = [];
  idsdata = [];

  role;
  
    private myDatePickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
    };

    private sdtmodel: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 0), day: this.d.getDate() } };
    private edtmodel: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };
  

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
  ) { }

  ngOnInit() {
    this._apiService.page = 'report';
    this.stdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 0)).slice(-2) + '-' + this.d.getDate();
    this.eddate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    this.utype = localStorage.getItem('utype');
    this.master_role = localStorage.getItem('master_role');
    this.getAttendanceByMonth();
    this.getRole();
  }

  getAttendanceByMonth() {
    this._apiService.getAttendanceByMonth(this.stdate,this.eddate).subscribe(data => {
      if(data.data.success) {
        this.collegdepts = data.data.colgdepts;
        this.mondata = data.data.mondata;
        this.idsdata = data.data.staffids;
        console.log(this.mondata);
      }
    });
  }

  getRole() {
    this._apiService.getRole().subscribe(data => {
      if (data.data.success) {
        this.role = data.data.role;
        // console.log(this.role);
      }
    });
  }

}