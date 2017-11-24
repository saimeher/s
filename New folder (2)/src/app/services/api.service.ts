import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { AppSettings } from '../app.settings';

@Injectable()
export class ApiService {

  page = "dashboard";
  // basicurl = "http://192.168.0.146/erpserver/";
  // basicurl = "http://210.16.79.137/raghuerp/server/";

  constructor(private _http: Http) { }

  // getting staff data
  getAttendanceByDate(adate) {
    const body = {
      'utype': localStorage.getItem('utype'),
      'adate': adate,
    };
    return this.callApi(AppSettings.GET_ATTENDANCE_BY_DATE_API, 'post', body);
  }
  //getting late  data
  getAttendanceByLateIn(adate)
  {
    const body = {
      'utype': localStorage.getItem('utype'),
      'adate': adate,
    };
    return this.callApi(AppSettings.GET_ATTENDANCE_BY_LATE_API, 'post', body);
  }
  getAttendanceByEarlyOut(adate)
  {
    const body = {
      'utype': localStorage.getItem('utype'),
      'adate': adate,
    };
    return this.callApi(AppSettings.GET_ATTENDANCE_BY_EARLY_API, 'post', body);
  }
  getAttendanceByNoIssue(adate)
  {
    const body = {
      'utype': localStorage.getItem('utype'),
      'adate': adate,
    };
    return this.callApi(AppSettings.GET_ATTENDANCE_BY_NOISSUE_API, 'post', body);
  }


  // getting staff data
  getMachines() {
    const body = {
      'utype': localStorage.getItem('utype')
    };
    return this.callApi(AppSettings.ACT_MACHINES_DATA_API, 'post', body);
  }

  // getting staff data
  getRole() {
    const body = {
      'utype': localStorage.getItem('utype')
    };
    return this.callApi(AppSettings.GET_ROLE_API, 'post', body);
  }

  // getting staff data
  addMachine(machine) {
    const body = {
      'utype': localStorage.getItem('utype'),
      'machine': machine
    };
    return this.callApi(AppSettings.ADD_MACHINE_API, 'post', body);
  }

  // getting staff data
  updateMachine(machine, mid) {
    const body = {
      'utype': localStorage.getItem('utype'),
      'machine': machine,
      'mid': mid,
    };
    return this.callApi(AppSettings.EDIT_MACHINE_API, 'post', body);
  }

  // getting staff data
  getUploadHistory() {
    const body = {
      'utype': localStorage.getItem('utype')
    };
    return this.callApi(AppSettings.UPLOAD_HISTORY_API, 'post', body);
  }

  // getting staff attendance data by days
  getAttendancebydays(id) {
    const body = {
      'token': localStorage.getItem('currentUser'),
      'utype': localStorage.getItem('utype'),
      'start_date':id.fdate,
      'end_date':id.tdate
    };
    return this.callApi(AppSettings.GET_ATTENDANCE_BY_DAYS, 'post', body);
  }

  gettestAttendancebydays(id) {
    const body = {
      'token': localStorage.getItem('currentUser'),
      'utype': localStorage.getItem('utype'),
      'start_date':id.fdate,
      'end_date':id.tdate
    };
    return this.callApi(AppSettings.GET_TEST_ATTENDANCE_BY_DAYS, 'post', body);
  }

  getAttendanceByMonth(sdate,tdate){
    const body = {
      'token': localStorage.getItem('currentUser'),
      'utype': localStorage.getItem('utype'),
      'start_date':sdate,
      'end_date':tdate
    };
    return this.callApi(AppSettings.GET_TEST_ATTENDANCE_BY_DAYS, 'post', body);
  }

  // getting staff data
  deleteUploadFile(hid) {
    const body = {
      'utype': localStorage.getItem('utype'),
      'history_id': hid
    };
    return this.callApi(AppSettings.DELETE_UPLOADFILE_API, 'post', body);
  }
  //getting staff data  and names
  getStaffData(value:any){
    let body = JSON.stringify(value);
    return this.callApi(AppSettings.STAFF_DATA_API, 'post', body);
  }


  getattendancebysingle(id,reg)
  {
    const body = {
      'reg_no': reg,
      'start_date':id.fdate,
      'end_date':id.tdate
    };
    return this.callApi(AppSettings.GET_ATTADENCE_SINGLE, 'post', body);
  }

  //get late commers in an month
  getcountforlate(id)
  {
    const body = {
      'start_date':id.fdate,
      'end_date':id.tdate
    };
    return this.callApi(AppSettings.GET_COUNT_LATE, 'post', body);    
  }

  getleave(id,reg)
  {
    const body = {
      'reg_no': reg,
      'start_date':id.fdate,
      'end_date':id.tdate
    };
    return this.callApi(AppSettings.GET_ABSENT_COUNT, 'post', body);
  }

  // responsible for making api calls
  callApi(url: string, method: string, body: Object): Observable<any> {
    console.log(`Http call - url: ${url}, body: ${JSON.stringify(body)}`);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // if user is logged in, append token to header
    if (localStorage.getItem('currentUser')) {
      headers.append('token', localStorage.getItem('currentUser'));
    }

    switch (method) {
      case 'post': return this._http.post(url, body, options).map((response: Response) => response.json());
      case 'get': return this._http.get(url, options).map((response: Response) => response.json());
    }
  }
}
