import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IMyDpOptions, IMyDateModel, IMyOptions, IMyDate } from 'mydatepicker';
import { ExportService } from '../common/export.service';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'underscore';




@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  lateout: number;
  lastin: number;
  reg_no = localStorage.getItem('reg_no');
  co;
  allbycollege = false;
  dtaa1 = 0;
  obj = new Object();
  count10 = 0;
  inner_loop = [];
  demo: any;
  demo1: any;
  days_form: FormGroup;
  master_role;
  utype;
  d = new Date();
  adate;
  collegdepts: any = [];
  attendance = [];
  idsdata = [];
  fdate;
  tdate;
  role;
  count;
  selectedItems = [];
  mondata = [];
  dropdownList = [];
  dropdownSettings = {};
  typesss = 'ALL';
  items = [];
  data;
  select = 'all';
  id;
  selectreg;
  display = false;
  show = false;
  mondata1 = [];
  collegdepts1 = [];
  idsdata1 = [];
  count1 = 0;
  view = false;
  data1;
  data2;
  data3;
  count2 = 0;
  work;
  worked1 = 0;
  show1 = false;
  worked;
  miss = 0;
  sum;
  hr;
  avg4;
  dtaa = 0;
  name;
  college;
  true2 = false;
  all;
  all1 = [];
  workeddays = 0;
  thours;
  minutes;
  leave;
  singlepunch = 0;
  nopunch = 0;
  dat;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "";
  public sortOrder = "asc";
  rowscount: number;

  newdates = [];
  no = [];
  startdate;
  loading: boolean = false;
  loading1: boolean = false;

  // public myDatePickerOptions: IMyDpOptions = {

  //   dateFormat: 'dd.mm.yyyy',
  // };


  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,

  };

  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,

    //  disableDays: this.service.holidays,
    disableUntil: { year: 0, month: 0, day: 0 }
    // disableUntil: {year: , month: 5 , day: 17}

  };

  public model: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };
  public model1: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };

  @ViewChild('test') el: ElementRef;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    private _exportService: ExportService,
    public vcr: ViewContainerRef,
    public fb: FormBuilder,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {


    this.days_form = this.fb.group({
      fdate: ['', Validators.required],
      tdate: ['', Validators.required]
      // selectchart:['',Validators.required]

    });
    this._apiService.page = 'ranger';
    this.fdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    this.tdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    console.log(this.fdate, this.tdate);
    this.utype = localStorage.getItem('utype');
    this.master_role = localStorage.getItem('master_role');
    this.getRole();

    // console.log(this.fdate,this.tdate,'from-to'); 
  }

  fdatemodel;
  tdatemodel;
  // onDateChanged1(event: IMyDateModel) {
  //   this.fdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
  //   this.fdatemodel = { date: { year: event.date.year, month: ('0' + event.date.month).slice(-2), day: ('0' + event.date.day).slice(-2) } };
  //   console.log(this.fdate, this.fdatemodel, 'from');
  // }


  onDateChanged1(event: IMyDateModel) {
    this.fdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
    // this.fdate = event.date.year + '-' + event.date.month + '-' + event.date.day;
    this.myDatePickerOptions2.disableUntil.year = event.date.year
    this.myDatePickerOptions2.disableUntil.month = event.date.month
    this.myDatePickerOptions2.disableUntil.day = event.date.day 
  }
  onDateChanged(event: IMyDateModel) {

    // this.to_date = event.formatted
    this.tdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
    // this.tdate = event.date.year + '-' + event.date.month + '-' + event.date.day;
    console.log(this.tdate, 'from date test');
  }
  // onDateChanged(event: IMyDateModel) {
  //   this.tdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
  //   this.tdatemodel = { date: { year: event.date.year, month: ('0' + event.date.month).slice(-2), day: ('0' + event.date.day).slice(-2) } };
  //   console.log(this.tdate, this.tdatemodel, 'to');
  //   // this.gettablecalender();
  // }
  enddate;
  count3 = 0;
  gettablecalender() {
    this.loading = true;
    this.loading1 = true;
    console.log(this.fdatemodel, this.tdatemodel, 'from-to date');
    console.log(this.model, this.model1, 'hfskrjdtgjkhjk');
    this.startdate = new Date(this.fdate);
    this.enddate = new Date(this.tdate);


    while (this.startdate <= this.enddate) {

      this.newdates.push(this.startdate.getFullYear() + '-' + ('0' + this.startdate.getMonth()).slice(-2) + '-' + ('0' + this.startdate.getDate()).slice(-2))

      this.startdate.setDate(this.startdate.getDate() + 1);

    }
    this.count = this.newdates.length;
    console.log(this.count);
    console.log(this.newdates, this.newdates.length, 'array dates');
    console.log(this.select);
    const body = {
      'fdate': this.fdate,
      'tdate': this.tdate,

    }
    this._apiService.getattendancebysingle(body, this.reg_no).subscribe(data => {
      this.data = data.data.average;
      this.miss = 0;
      this.worked1 = 0;
      this.count3 = 0;
      this.sum = 0;
      this.dtaa = 0;
      this.no = data.data.average;
      if (data.data.data1 != '') {
        this.name = data.data.data1[0].name;
        this.college = data.data.data1[0].department;
        this.co = data.data.data1[0].college;
        // this.table1 = false;
      }
      if (data.data.data1 == '') {
        // this.table1 = true;
      }
      this.work = data.data.work[0].count;
      this.worked = data.data.worked.length;

      if (data.data.latein == '') {
        this.lastin = 0;
      }
      if (data.data.latein != '') {
        this.lastin = data.data.latein.length;
      }
      if (data.data.lateout == '') {
        this.lateout = 0;
      }
      if (data.data.lateout != '') {
        this.lateout = data.data.lateout.length;
      }

      for (var i = 0; i < data.data.worked.length; i++) {
        console.log(data.data.worked[i].ct);
        if (data.data.worked[i].ct == 1) {
          this.count3 += 1;
        }
        if (data.data.worked[i].ct == 2) {
          this.worked1 += 1;
        }

      }
      for (i = 0; i < data.data.average.length; i++) {
        if (data.data.average[i].seconds == null) {
          console.log('hi');
        }
        if (data.data.average[i].seconds != null) {
          this.sum += parseInt(data.data.average[i].seconds);
        }
      }
     console.log(this.sum);
      console.log(this.worked1);
      var hours = (this.sum / 3600);
      console.log(hours,this.sum);
      var average = hours / this.worked1;
      console.log(average);
      var avg = average.toString().split('.');
      console.log(avg);
      this.hr = avg[0];
      console.log(this.hr);

      var avg1 = '0.' + avg[1];
      var avg2 = parseFloat(avg1) * 60;
      var avg3 = avg2.toString().split('.');

      this.avg4 = avg3[0];
      var minutes = Math.floor((this.sum - (hours * 3600)) / 60);

      this.dtaa = data;
      this.miss = (this.work - (this.count3 + this.worked1));
      console.log(this.miss);

      data.data.no.forEach(element => {
        this.no.push({
          'it': null,
          'ot': null,
          'difference': '',
          'seconds': '',
          'reg_no': '',
          'name': '',
          'college': '',
          'department': '',
          'tdate': element.dt,
          'wday': '',
          'morning': '',
          'evening': '',
          'intime': '',
          'outtime': ''
        });
      });


      this.no = _.sortBy(this.no, function (s) {
        return [s['tdate']]
      })
      this.rowscount = this.no.length;
      console.log(this.no.length);
      this.show = false;
      this.view = true;
      this.allbycollege = false;
      this.collegdepts = false;
      this.true2 = true;
      this.display = true;
      this.show1=true;
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

