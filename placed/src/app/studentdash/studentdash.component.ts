import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, ElementRef, ViewContainerRef, Input, AUTO_STYLE } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from "@angular/forms";
import { ModalModule } from "ngx-modal";
import { CustomValidators } from 'ng2-validation';
import * as Highcharts from 'highcharts';
import { NouisliderComponent } from 'ng2-nouislider';
import { log } from 'util';


@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {
  companyattended = false;
  notattendedcount: number = 0;
  attendcount: number = 0;
  check;
  dat;
  data;
  data1;
  true1 = false;
  placed;
  attended;
  placed_count;
  table = false;
  dtaa;
  all1 = [];
  status;
  wilingcount;
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";
  public filterQuery1 = "";
  public rowsOnPage1 = 5;
  public sortBy1 = "";
  public sortOrder1 = "asc";
  @ViewChild('company') modal: any;
  date1 = '';
  d = new Date();
  obj = new Object();
  plannedcompany;

  companyselected = false;
  companynotattended = false;
  regno = localStorage.getItem('reg_no');
  branch = localStorage.getItem('branch_id');
  college = localStorage.getItem('college_id');

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getterms();
    this.getattendedlist();
    this.getcompanylist();
    this.checkstatus();
    this.notattended();
    this.getplannedcompanylist();
    console.log(this.branch, this.college);
    this.date1 = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate();

  }
  terms() {
    let bod = {}
    bod['reg_no'] = this.regno;
    this._apiService.terms(bod).subscribe(dat => {
      this.dat = dat.data;
      this.getterms();
      this.true1 = true;
    })
  }

  getterms() {
    let bod = {}
    bod['reg_no'] = this.regno;
    this._apiService.getterms(bod).subscribe(data => {
      if (data.data.getterms) {
        this.data1 = data.data.getterms.confirmation;
        this.data = parseInt(this.data1);
        if (this.data != 1) {
          this.table == true;
        }
        this.true1 = true;
      }

      console.log(this.data);
    })
  }
  getattendedlist() {
    let bod = {}
    bod['reg_no'] = this.regno;
    this._apiService.getattendedlist(bod).subscribe(data => {
      this.attendcount = data.data.attencount.length;
      this.placed = data.data.placed;
      this.placed_count = data.data.placed.length;
      this.attended = data.data.attended;
      console.log(this.attended);


      console.log(this.attendcount);
    })
  }
  attendedlist() {
    this.data = this.attended;
    console.log(this.data);
    this.companyselected = false;
    this.companynotattended = false;
    this.companyattended = true;
    this.true1 = true;
    this.modal.open();
  }

  selectedlist() {
    this.placed = this.placed;
    console.log(this.data);
    this.true1 = true;
    this.companyselected = true;
    this.companyattended = false;
    this.companynotattended = false;
    this.modal.open();
  }

  getcompanylist() {
    let bod = {}
    bod['reg_no'] = this.regno;
    bod['branch_id'] = this.branch;
    bod['college_id'] = this.college;
    this._apiService.getcompanineslist(bod).subscribe(data => {
      this.dtaa = data.data.data;
      this.check = data.data.check;
      console.log(data.data.data);
      this.all1 = [];
      for (var i = 0; i < data.data.data.length; i++) {
        var chkdata = data.data.check.filter(function (obj: any) {
          return obj.company_id == data.data.data[i].fid && (obj.status == '1' || obj.status == 1);
        })
        var chkdata0 = data.data.check.filter(function (obj: any) {
          return obj.company_id == data.data.data[i].fid && (obj.status == '0' || obj.status == 0);
        })

        if (chkdata.length > 0) {
          this.obj = {
            'fid': data.data.data[i].fid,
            'company': data.data.data[i].company,
            'location': data.data.data[i].location,
            'package': data.data.data[i].package,
            'backlogs': data.data.data[i].backlogs,
            'percentage': data.data.data[i].percentage,
            'stat': data.data.data[i].stat,
            'c_date': data.data.data[i].c_date,
            'status': 1
          };
          // this.all1.push(this.obj);      
        } else {
          this.obj = {
            'fid': data.data.data[i].fid,
            'company': data.data.data[i].company,
            'location': data.data.data[i].location,
            'package': data.data.data[i].package,
            'backlogs': data.data.data[i].backlogs,
            'percentage': data.data.data[i].percentage,
            'stat': data.data.data[i].stat,
            'c_date': data.data.data[i].c_date,
            'status': 0
          };
        }
        if (chkdata0.length > 0) {
          this.obj = {
            'fid': data.data.data[i].fid,
            'company': data.data.data[i].company,
            'location': data.data.data[i].location,
            'package': data.data.data[i].package,
            'backlogs': data.data.data[i].backlogs,
            'percentage': data.data.data[i].percentage,
            'stat': data.data.data[i].stat,
            'c_date': data.data.data[i].c_date,
            'status': 2
          };
        }
        this.all1.push(this.obj);
        // for(var j=0; j<data.data.check.length;j++)
        // {
        //   // console.log(parseInt(data.data.check[j].company_id));
        //   // console.log(parseInt(data.data.data[i].fid));
        //   let fidi = data.data.data[i].fid;
        //   let cid = data.data.check[j].company_id;

        // //  if(parseInt() == parseInt(data.data.check[j].company_id))
        //  if(parseInt(fidi) == parseInt(cid))
        //  {
        //    if(parseInt(this.check[j].status) == 1 )
        //    {
        //    this.status = 1;
        //    }

        //  }
        // }
      }
      console.log(this.all1, 'sgdfjsdgfjkgsdfs');
    })
  }
  yes(id) {
    console.log(id);
    let bod = {}
    bod['reg_no'] = this.regno;
    bod['branch_id'] = this.branch;
    bod['college_id'] = this.college;
    bod['company_id'] = id.fid

    this._apiService.sendconfromation(bod).subscribe(data => {
      this.data = data.data;
      this.getcompanylist();
    })
  }

  checkstatus() {
    let bod = {}
    bod['reg_no'] = this.regno;
    this._apiService.checkstatus(bod).subscribe(dat => {
      this.check = dat.data.data;
      console.log(this.check);
    })
  }
  close(id) {
    console.log(id);
    let bod = {}
    bod['reg_no'] = this.regno;
    bod['branch_id'] = this.branch;
    bod['college_id'] = this.college;
    bod['company_id'] = id.fid

    this._apiService.noconformation(bod).subscribe(data => {
      this.data = data.data;
      this.getcompanylist();
    })
  }
  notattended() {
    let bod = {}
    bod['reg_no'] = this.regno;
    this._apiService.notattended(bod).subscribe(data => {
      if (data.data.dtaa) {
        this.notattended = data.data.dtaa;
        this.notattendedcount = data.data.dtaa.length;
      }

      console.log(this.notattended, 'fgdf');
    })

  }
  confrombutnot() {
    this.notattended = this.notattended;
    this.true1 = true;
    this.companynotattended = true;
    this.companyattended = false;
    this.companyselected = false;
    this.modal.open();
  }


  getplannedcompanylist() {
    let bod = {}
    bod['reg_no'] = this.regno;
    bod['branch_id'] = this.branch;
    bod['college_id'] = this.college;
    this._apiService.getplannedcompanylist(bod).subscribe(data => {
      this.plannedcompany = data.data.data;
      this.wilingcount = data.data.uncheck;

      this.plannedcompany = [];
      for (var i = 0; i < data.data.data.length; i++) {
        var chkdata1 = data.data.uncheck.filter(function (obj: any) {
          return obj.plannedcompany_id == data.data.data[i].pid && (obj.status == '1' || obj.status == 1);
        })
        var chkdata2 = data.data.uncheck.filter(function (obj: any) {
          return obj.plannedcompany_id == data.data.data[i].pid && (obj.status == '0' || obj.status == 0);
        })

        if (chkdata1.length > 0) {
          this.obj = {
            'pid': data.data.data[i].pid,
            'company': data.data.data[i].company,
            'location': data.data.data[i].location,
            'package': data.data.data[i].package,
            'backlogs': data.data.data[i].backlogs,
            'percentage': data.data.data[i].percentage,
            'stat': data.data.data[i].stat,
            'c_date': data.data.data[i].planned_date,
            'status': 1
          };
          // this.all1.push(this.obj);      
        } else {
          this.obj = {
            'pid': data.data.data[i].pid,
            'company': data.data.data[i].company,
            'location': data.data.data[i].location,
            'package': data.data.data[i].package,
            'backlogs': data.data.data[i].backlogs,
            'percentage': data.data.data[i].percentage,
            'stat': data.data.data[i].stat,
            'c_date': data.data.data[i].planned_date,
            'status': 0
          };
        }
        if (chkdata2.length > 0) {
          this.obj = {
            'pid': data.data.data[i].pid,
            'company': data.data.data[i].company,
            'location': data.data.data[i].location,
            'package': data.data.data[i].package,
            'backlogs': data.data.data[i].backlogs,
            'percentage': data.data.data[i].percentage,
            'stat': data.data.data[i].stat,
            'c_date': data.data.data[i].planned_date,
            'status': 2
          };
        }
        this.plannedcompany.push(this.obj);
      }
      console.log(this.plannedcompany, 'sgdfjsdgfjkgsdfs');
    })
  }
  planned(item1)
  {
    console.log(item1);
    let bod = {}
    bod['reg_no'] = this.regno;
    bod['branch_id'] = this.branch;
    bod['college_id'] = this.college;
    bod['company_id'] = item1.pid
    bod['condition'] = 'yes'
   
    this._apiService.planned(bod).subscribe(data=>{
       this.data = data.data;
       this.getplannedcompanylist();
    })
  }
  plannedno(item1)
  {
    console.log(item1);
    let bod = {}
    bod['reg_no'] = this.regno;
    bod['branch_id'] = this.branch;
    bod['college_id'] = this.college;
    bod['company_id'] = item1.pid
    bod['condition'] = 'no'
   
    this._apiService.planned(bod).subscribe(data=>{
       this.data = data.data;
       this.getplannedcompanylist();
    })
  }


}
