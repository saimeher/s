import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IMyDpOptions, IMyDateModel, IMyOptions, IMyDate } from 'mydatepicker';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ExportService } from '../common/export.service';
import * as JSPdf from 'jspdf';
import * as _ from 'underscore';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



declare let jsPDF;
declare var $;


@Component({
  selector: 'app-ranger',
  templateUrl: './ranger.component.html',
  styleUrls: ['./ranger.component.css']
})
export class RangerComponent implements OnInit {
  hidden = "true";
  showusers: any[];
  reg_no1;
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
  reg_no;
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
  view4 = false;
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
  back1 = false;
  rowscount: string = '100';
  rowscount1: string = '1000';
  lateout;
  lastin;
  table1 = false;

  public filterQuery = "";
  public rowsOnPage = 50;
  public sortBy = "";
  public sortOrder = "asc";

  newdates = [];
  startdate;
  loading: boolean = false;
  loading1: boolean = false;
  pdf = false;
  no = [];

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
      tdate: ['', Validators.required],
      selectid: ['', Validators.required],
      college: ['', Validators.required],
      // selectchart:['',Validators.required]

    });
    this._apiService.page = 'ranger';
    this.fdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    this.tdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    console.log(this.fdate, this.tdate);
    this.utype = localStorage.getItem('utype');
    this.master_role = localStorage.getItem('master_role');
    const vals = {
      utype: 'adm',

    }
    this._apiService.getStaffData(vals).subscribe(dataa => {
      // console.log(dataa);
      for (var i = 0; i < dataa.data.data.length; i++) {
        this.dropdownList[i] = new Object();
        this.dropdownList[i]["id"] = dataa.data.data[i].reg_no;
        this.dropdownList[i]["itemName"] = dataa.data.data[i].reg_no + ' - ' + dataa.data.data[i].name;
        this.dropdownList[i]["name1"] = dataa.data.data[i].name;

        this.items[i] = new Object();
        this.items[i].name = dataa.data.data[i].name;
        this.items[i].reg_no = dataa.data.data[i].reg_no;

      }
      this.dropdownList.unshift({ 'id': 'all', 'itemName': 'ALL', 'name1': 'ALL' })
    });

    this.showusers = [{ 'id': 'all', 'itemName': 'ALL' }];

    this._apiService.getcolleges(vals).subscribe(dat => {
      this.dat = dat.data;
      console.log(this.dat);
    })
    this.getRole();
    this.dropdownSettings = {

      // singleSelection: true,
      // text: "Select ",
      // enableSearchFilter: true,
      // classes: "myclass custom-class",
      singleSelection: true,
      text: "ALL",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
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
    // this.fdate = new Date(this.fdate).setDate(new Date(this.fdate).getDate()-1) 
    this.myDatePickerOptions2.disableUntil.year = event.date.year
    this.myDatePickerOptions2.disableUntil.month = event.date.month

    this.myDatePickerOptions2.disableUntil.day = event.date.day 
  }
  // onDateChanged1(event: IMyDateModel) {
  //   this.fdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
  //   // this.fdate = event.date.year + '-' + event.date.month + '-' + event.date.day;
  //   this.fdate = new Date(this.fdate).setDate(new Date(this.fdate).getDate()-1) 
  //   this.myDatePickerOptions2.disableUntil.year = new Date(this.fdate).getFullYear() 
  //   this.myDatePickerOptions2.disableUntil.month = new Date(this.fdate).getMonth()

  //   this.myDatePickerOptions2.disableUntil.day = new Date(this.fdate).getDate() 
  // }
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
    this.college =this.days_form.value.college;
    console.log(this.college);
    const body = {
      'fdate': this.fdate,
      'tdate': this.tdate,
      'college': this.days_form.value.college,

    }

    if (this.id == undefined || this.id == 'all') {
      this.id = 'all';
      this._apiService.gettestAttendancebydays(body).subscribe(data => {
        if (data.data.success) {
          this.collegdepts = data.data.colgdepts;
          this.mondata = data.data.mondata;
          this.idsdata = data.data.staffids;
          this.work = data.data.work[0].count;
          this.all = data.data.data4;

          console.log(this.collegdepts, this.all);
          this.all1 = [];
          if (this.all != null) {
            for (var j = 0; j < this.collegdepts.length; j++) {
              this.demo = this.collegdepts[j];
              if (this.all[this.demo.college + '-' + this.demo.department]) {
                for (var i = 0; i < this.idsdata[this.demo.college + '-' + this.demo.department].length; i++) {
                  if (this.idsdata[this.demo.college + '-' + this.demo.department][i])
                    this.demo1 = this.idsdata[this.demo.college + '-' + this.demo.department][i];
                  this.inner_loop = this.all[this.demo.college + '-' + this.demo.department];
                  if (this.inner_loop[this.demo1]) {
                    this.count10 = 0;
                    this.workeddays = 0;
                    this.singlepunch = 0;
                    this.dtaa1 = 0;
                    this.nopunch = 0;
                    for (var k = 0; k < this.inner_loop[this.demo1].length; k++) {
                      if (parseInt(this.inner_loop[this.demo1][k].ct) == 2) {
                        this.workeddays += 1;
                      }
                      if (parseInt(this.inner_loop[this.demo1][k].ct) == 1) {
                        this.singlepunch += 1;
                      }
                      if (parseInt(this.inner_loop[this.demo1][k].seconds)) {
                        this.count10 = this.count10 + parseInt(this.inner_loop[this.demo1][k].seconds);

                        var hou = (this.count10 / 3600);
                        var average = hou / this.workeddays;

                        var avg5 = average.toString().split('.');

                        this.thours = avg5[0];

                        var avg6 = '0.' + avg5[1];
                        var avg7 = parseFloat(avg6) * 60;
                        var avg8 = avg7.toString().split('.');
                        this.minutes = avg8[0];
                      }
                      // if ((this.inner_loop[this.demo1][k].reg_no) && (k==0)) {
                      //  this._apiService.getleave(body, this.inner_loop[this.demo1][k].reg_no).subscribe(data => {
                      //   console.log(data);
                      //     this.dtaa1 = data;
                      //     console.log(this.dtaa1,'hfsf');
                      //    this.nopunch = (this.work - (this.singlepunch + this.workeddays - this.dtaa1));
                      //   })
                      // }
                    }
                    this.obj = {
                      'name': this.inner_loop[this.demo1][0].name,
                      'reg_no': this.inner_loop[this.demo1][0].reg_no,
                      'count': this.count10,
                      'department': this.demo.department,
                      'hours': this.thours,
                      'minutes': this.minutes,
                      'nopunch': (this.work - (this.singlepunch + this.workeddays - this.dtaa1)),
                      'leaves': this.dtaa1,
                      'workeddays': this.workeddays + this.singlepunch,
                      'singlepunch': this.singlepunch,
                    };
                    this.all1.push(this.obj);



                    //  setTimeout(() => {
                    //   this.obj = {
                    //     'name': this.inner_loop[this.demo1][0].name,
                    //     'reg_no': this.inner_loop[this.demo1][0].reg_no,
                    //     'count': this.count10,
                    //     'department':this.demo.department,
                    //     'hours': this.thours,
                    //     'minutes': this.minutes,
                    //     'nopunch': (this.work - (this.singlepunch + this.workeddays - this.dtaa1)),
                    //     'leaves': this.dtaa1,
                    //     'workeddays': this.workeddays + this.singlepunch,
                    //     'singlepunch': this.singlepunch,
                    //   };
                    //   this.all1.push(this.obj);
                    //  }, 50000);            
                  }
                }
              }
            }
            console.log(this.all1);
            this.data = this.all1;
            this.rowscount = this.data.length;
          }
          else {
            this.data = '';
          }
          console.log(this.collegdepts.length);
          this.loading = false;
          this.loading1 = false;
          this.display = false;
          this.view = false;
          this.back1 = false;
          this.view4 = false;
          this.true2 = true;
          this.pdf = true;
          this.show = true;
          this.true2 = true;
          this.allbycollege = true;
          this.getcountforlate(body);
          console.log(this.all, 'college & departments');
        }
      });
    }
    else {
      console.log('else');
      console.log(this.id);
      this._apiService.getattendancebysingle(body, this.id).subscribe(data => {
        this.data = data.data.average;
        // for(var j=0;j<data.data.no.length;j++)
        // {
        //   this.no.push(data.data[j]);
        // }
        // this.no.push(data.data.no);
        console.log(data.data.no);
        this.no=data.data.average;
        
         console.log(this.no);
        if (data.data.data1 != '') {
          this.name = data.data.data1[0].name;
          this.college = data.data.data1[0].department;
          this.co = data.data.data1[0].college;
          this.table1 = false;
        }
        if (data.data.data1 == '') {
          this.table1 = true;
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
        this.miss = 0;
        this.worked1 = 0;
        this.count3 = 0;
        this.sum = 0;
        this.dtaa = 0;

        console.log(this.dtaa, this.lastin, this.lateout.length, 'gfsdhfgsdhgfsdh');
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


        console.log(this.worked1);
        var hours = (this.sum / 3600);
        var average = hours / this.worked1;

        var avg = average.toString().split('.');

        this.hr = avg[0];

        var avg1 = '0.' + avg[1];
        var avg2 = parseFloat(avg1) * 60;
        var avg3 = avg2.toString().split('.');

        this.avg4 = avg3[0];
        console.log(this.work, this.worked1, this.dtaa, this.count3);
        this.miss = (this.work - (this.count3 + this.worked1 + this.dtaa));
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
       

        this.no=_.sortBy(this.no,function(s){
          return [s['tdate']]
         })
        this.show = false;
        this.view = false;
        this.allbycollege = false;
        this.collegdepts = false;
        this.view4 = false;
       
        // this.id ='';
        // this.show1 = true;
        this.pdf = false;
        this.true2 = true;
        this.display = true;
        // var minutes = Math.floor((this.sum - (hours * 3600)) / 60);

        // this._apiService.getleave(body, this.id).subscribe(data => {
        //   this.dtaa = data;


        // })
      });
    }
  }
  alldata() {
    this.view4 = true;
    this.data = this.data;
    console.log(this.data);
  }
  getRole() {
    this._apiService.getRole().subscribe(data => {
      if (data.data.success) {
        this.role = data.data.role;
        // console.log(this.role);
      }
    });
  }

  // Export
  collegename;
  deptname;
  clg_fullname;
  dept_fullname;
  clg_id;
  value2 = [];
  value3 = [];
  newresult = [];
  value4 = [];
  value5 = [];
  export(type, data, value1) {
    console.log(type, data, value1, 'export');

    this.collegename = data[0].college;
    this.deptname = data[0].department;
    this.clg_fullname = data[0].college_name;
    this.dept_fullname = data[0].department_name;
    console.log(this.collegename, this.deptname, 'filenames');

    this.clg_id = data[0].id;
    console.log(this.clg_id, 'clgid');


    this.value2 = this.mondata[this.clg_id];
    this.attendance = this.idsdata[this.clg_id];

    console.log(this.value2, this.attendance, 'actual result');

    for (var i = 0; i <= this.attendance.length; i++) {
      this.value3 = this.value2[this.attendance[i]];
      this.newresult.push(this.value3);
      //console.log(this.attendance.length,this.value2[this.attendance[0]],'data');
    }
    // this.value3 = this.value2[this.attendance[0]];
    console.log(this.newresult.length, this.newresult, 'data');

    for (var j = 0; j < this.newresult.length; j++) {
      if (this.newresult[j]) {
        for (var k = 0; k < this.newresult[j].length; k++) {
          this.value4 = this.newresult[j][k];
          if (this.newresult[j][k]) {
            this.value5.push(this.value4);
          }
        }

      }
      // console.log(this.value5,'single array');
    }
    console.log(this.value5, 'single array');

    // create data to export with custom headers and s.no
    const exportData: Array<any> = [];

    if (this.collegdepts && this.mondata) {
      console.log('attendance is ', this.newresult)
      this.value5.forEach(row => {
        exportData.push({
          'College': this.clg_fullname,
          'Department': this.dept_fullname,
          'Employee id': row.reg_no,
          'Employee_name': row.name,
          'Date': row.date,
          'Weekday': row.weekday,
          'Morning': row.morning,
          'Evening': row.evening,
          'From - Todate': this.fdate + '--' + this.tdate,
        });
      });

      const data = 'test';
      const columns = [
        { title: 'college', dataKey: 'college' },
        { title: 'department', dataKey: 'department' },
        { title: 'employee_id', dataKey: 'reg_no' },
        { title: 'Employee Name', dataKey: 'name' },
        // { title: 'Contact No', dataKey: 'mobile' },
        { title: 'Date', dataKey: 'date' },
        { title: 'WeekDay', dataKey: 'weekday' },
        { title: 'Morning', dataKey: 'morning' },
        { title: 'Evening', dataKey: 'evening' },
      ];

      switch (type) {
        case 'csv':
          console.log(this.collegename, this.deptname)
          this._exportService.exportToCsv(this.collegename + '-' + this.deptname, exportData);
          break;

      }
    }
  }
  public download() {
    var doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.save('Test.pdf');
  }

  public pdfHtml(): void {
    const pdf = new jsPDF('p', 'pt', 'a4');
    console.log(this.el);
    let options = {
      pagesplit: true
    };
    pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
      pdf.save("test.pdf");
    });

  }
  print() {
    this.hidden = "true"
    console.log(this.hidden,this.college);
    window.print();
  }

  onItemSelect(item: any) {
    this.id = item.id;
    console.log(this.id);
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }

  Types(a) {
    this.reg_no = a.reg_no;
    this.typesss = a.name;
  }
  getcountforlate(body) {
    this._apiService.getcountforlate(body).subscribe(data => {
      this.collegdepts1 = data.data.colgdepts;
      this.mondata1 = data.data.mondata;
      this.data3 = data.data.data2;
      this.data1 = data.data.data1;

      if (data.data.data1) {
        this.count1 = data.data.data1.length;
      }
      if (data.data.data2) {
        this.count2 = data.data.data2.length;
      }

      // this.count1 =data.data.mondata.count;
      this.idsdata1 = data.data.staffids;
    })
  }
  view1() {
    const body1 = {
      'fdate': this.fdate,
      'tdate': this.tdate,
      'college': this.days_form.value.college,
    }
    this._apiService.getcountforlate(body1).subscribe(data => {
      this.collegdepts1 = data.data.colgdepts;
      this.mondata1 = data.data.mondata;
      this.data1 = data.data.data1;
      this.data3 = data.data.data2;
      this.data2 = this.data1;
      this.rowscount1 = this.data2.length;
      console.log(this.rowscount1);
      this.allbycollege = false;
      this.pdf = true;
      this.view = true;
    });
  }

  view2() {
    const body1 = {
      'fdate': this.fdate,
      'tdate': this.tdate,
      'college': this.days_form.value.college,
    }
    this._apiService.getcountforlate(body1).subscribe(data => {
      this.collegdepts1 = data.data.colgdepts;
      this.mondata1 = data.data.mondata;
      this.data1 = data.data.data1;
      this.data3 = data.data.data2;
      this.data2 = this.data3;
      this.rowscount1 = this.data2.length;
      console.log(this.rowscount1);
      this.allbycollege = false;
      this.pdf = true;
      this.view = true;
    });
  }
  getdata(fdt) {
    this.back1 = true;
    this.showusers = [];
    this.showusers[0] = new Object();
    console.log(fdt.reg_no);
    this.showusers[0]['id'] = fdt.reg_no;
    this.showusers[0]['itemName'] = fdt.reg_no;
    this.id = fdt.reg_no;
    console.log(this.reg_no1);
    this.gettablecalender();


  }

  back() {
    this.display = false;
    this.show1 = false;
    this.back1 = false;
    this.allbycollege = true;
    this.pdf = true;
    this.id = 'all';
    this.showusers = [];
    this.showusers.push({ 'id': 'all', 'itemName': 'ALL' });
    // this.showusers[0]['id'] = this.id;
    this.gettablecalender();
  }
}
