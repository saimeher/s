import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import * as JSPdf from 'jspdf';

import { IMyDpOptions, IMyDateModel, IMyOptions, IMyDate } from 'mydatepicker';
declare let jsPDF;
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count4 = 0;
  count5 = 0;
  master_role;
  utype;
  d = new Date();
  adate;
  test1 = false;
  collegdepts = [];
  attendance = [];
  attendance1 = [];
  collegdepts1 = [];
  attendance3 = [];
  collegdepts3 = [];
  attendance2 = [];
  collegdepts2 = [];
  count1 = 0;
  count2 = 0;
  count3 = 0;
  role;
  test = false;
  test2 = false;
  loading: boolean = false;
  loading1: boolean = false;

  // private myDatePickerOptions: IMyDpOptions = {
  //   // other options...
  //   dateFormat: 'dd.mm.yyyy',
  // };

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,
    // disableDays: this.service.holidays,
    disableSince: { year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() + 1 }
    // disableUntil: {year: , month: 5 , day: 17}

  };

  private model: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
  ) { }

  ngOnInit() {
    this._apiService.page = 'dashboard';
    this.adate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    console.log(this.adate);
    this.utype = localStorage.getItem('utype');
    this.master_role = localStorage.getItem('master_role');
    // if (this.utype != 'adm' && this.master_role != 'bio') {
    //   window.location.href = 'http://210.16.79.137/raghuerp/';
    //   console.log(this.utype, ' & ', this.master_role);
    // }
    this.getAttendanceByDate();
    this.getAttendanceByEarlyOut();
    this.getAttendanceByLateIn();
    this.getAttendanceByEarlyOut();
    this.getAttendanceByNoIssue();
    this.getAttend();
    this.getRole();
  }

  onDateChanged(event: IMyDateModel) {
    this.adate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
    console.log(this.adate);
    this.getAttendanceByDate();
    this.getAttendanceByLateIn();
    this.getAttendanceByEarlyOut();
    this.getAttendanceByNoIssue();
    this.getAttendanceBySinglePunch();
    this.getAttend();

  }

  getAttendanceByDate() {
    this.loading = true;
    this.loading1 = true;
    this.test2 = true;
    this.test = false;
    this.loading = true;
    this.loading1 = true;
    this._apiService.getAttendanceByDate(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts = data.data.colgdepts;
        this.attendance = data.data.attendance;

        this.test1 = true;
        console.log(this.attendance);
      }
    });
  }
  getAttendanceByLateIn() {
    this.count1 = 0;
    this._apiService.getAttendanceByLateIn(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts1 = data.data.colgdepts;
        this.attendance1 = data.data.attendance1;
        if (data.data.attendance1) {
          this.count1 = data.data.attendance1.count;
        }
        console.log(this.attendance1, this.count1);
      }
    });
  }
  view1() {
    this._apiService.getAttendanceByLateIn(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts1 = data.data.colgdepts;
        this.attendance1 = data.data.attendance1;
        if (data.data.attendance1) {
          this.count1 = data.data.attendance1.count;
        }
        this.test1 = false;
        this.test2 = false;
        this.test = true;


        console.log(this.attendance1, this.count1);
      }
    });
  }

  getAttendanceByEarlyOut() {
    this.count2 = 0;
    this._apiService.getAttendanceByEarlyOut(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts3 = data.data.colgdepts;
        this.attendance3 = data.data.attendance2;
        if (data.data.attendance2) {
          this.count2 = data.data.attendance2.count;
        }
        console.log(this.attendance1, this.count1);
      }
    });
  }
  view2() {
    this._apiService.getAttendanceByEarlyOut(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts1 = data.data.colgdepts;
        this.attendance1 = data.data.attendance2;
        if (data.data.attendance2) {
          this.count2 = data.data.attendance2.count;
        }
        this.test2 = false;
        this.test1 = false;
        this.test = true;
        console.log(this.attendance1, this.count2);
      }
    });
  }
  getAttendanceByNoIssue() {
    this.count3 = 0;
    this._apiService.getAttendanceByNoIssue(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts2 = data.data.colgdepts;
        this.attendance2 = data.data.attendance3;
        if (data.data.attendance3) {
          this.count3 = data.data.attendance3.count;
        }
        console.log(this.count3);
      }
    });
  }
  view3() {
    this._apiService.getAttendanceByNoIssue(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts1 = data.data.colgdepts;
        this.attendance1 = data.data.attendance3;
        if (data.data.attendance3) {
          this.count3 = data.data.attendance3.count;
        }
        this.test2 = false;
        this.test = true;
        this.test1 = false;
        console.log(this.count3);
      }
    });
  }
  getAttendanceBySinglePunch() {
    this.count4 = 0;
    this._apiService.getAttendanceBySinglePunch(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts2 = data.data.colgdepts;
        this.attendance2 = data.data.attendance3;
        if (data.data.countsingle) {
          this.count4 = data.data.countsingle[0].countsingle;
        }
        console.log(this.count4);
      }
    });
  }
  view4() {
    this._apiService.getAttendanceBySinglePunch(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts1 = data.data.colgdepts;
        this.attendance1 = data.data.attendance3;
        if (data.data.countsingle) {
          this.count4 = data.data.countsingle[0].countsingle;
        }
        this.test2 = false;
        this.test = true;
        this.test1 = false;
        console.log(this.count3);
      }
    });
  }
  getAttend() {
    this.count5 = 0;
    this._apiService.getAttendanceByNoPunch(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts2 = data.data.colgdepts;
        this.attendance2 = data.data.attendance3;
        if (data.data.countsingle) {
          this.count5 = data.data.countsingle[0].countsingle;
        }
        console.log(this.count5);
      }
    });
  }
  view5() {
    this._apiService.getAttendanceByNoPunch(this.adate).subscribe(data => {
      if (data.data.success) {
        this.collegdepts1 = data.data.colgdepts;
        this.attendance1 = data.data.attendance3;
        if (data.data.countsingle) {
          this.count5 = data.data.countsingle[0].countsingle;
        }
        this.test2 = false;
        this.test = true;
        this.test1 = false;
        console.log(this.count5);
      }
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
  // public download() {
  //   var doc = new jsPDF();
  //   doc.text(20, 20, 'Hello world!');
  //   doc.save('Test.pdf');
  // }

  // public pdfHtml(): void {
  //   const pdf = new jsPDF('p', 'pt', 'a4');
  //   console.log(this.el);
  //   let options = {
  //     pagesplit: true
  //   };
  //   pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
  //     pdf.save("test.pdf");
  //   });

  // }
  print() {
    window.print();
  }

}
