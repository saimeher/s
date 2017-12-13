import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { AppSettings } from '../app.settings';

@Injectable()
export class ApiService {

  page = "dashboard";
  basicurl = "http://192.168.0.129/placement_server/upload";
  // basicurl = "http://210.16.79.137/raghuerp/jobportal/server/upload";
  constructor(private _http: Http) { }

  // getting registered data
  studentsdatabyid() {
    const body = {};
    return this.callApi(AppSettings.GET_STUDENTSDATA_API, 'get', body);
  }

  reSendotp(body) {
    return this.callApi(AppSettings.RESEND_OTP_API, 'post', body);
  }

  getColldept() {
    const body = {
      'utype': 'adm'
    };
    return this.callApi(AppSettings.GET_COLL_DEPT_LIST_API, 'post', body);
  }

  setstatus(id, eid) {
    const body = {
      'XIIboard_status': id.XIIboard_status,
      'XIIpass_status': id.XIIpass_status,
      'XIIper_status': id.XIIper_status,
      'Xboard_status': id.Xboard_status,
      'Xpass_status': id.Xpass_status,
      'Xper_status': id.Xper_status,
      'aadhar_status': id.aadhar_status,
      'address_status': id.address_status,
      'altermobile_status': id.altermobile_status,
      'backlogs_status': id.backlogs_status,
      'branch_status': id.branch_status,
      'btechboard_status': id.btechboard_status,
      'btechpass_status': id.btechpass_status,
      'btechper_status': id.btechper_status,
      'college_status': id.college_status,
      'dob_status': id.dob_status,
      'email_status': id.email_status,
      'father_status': id.father_status,
      'firstname_status': id.firstname_status,
      'gender_status': id.gender_status,
      'lastname_status': id.lastname_status,
      'mobile_status': id.mobile_status,
      'mother_status': id.mother_status,
      'reg_status': id.reg_status,
      'resume_status': id.resume_status,
      'section_status': id.section_status,
      'year_status': id.year_status,
      'language_status': id.language_status,
      'nationalitiy_status': id.nationalitiy_status,
      'proffision_status': id.proffision_status,
      'course_status': id.course_status,
      'utype': localStorage.getItem('utype'),
      'master_role': localStorage.getItem('master_role'),
      'r_id': eid.r_id,
      'reg_no': eid.university_reg_number
    }
    console.log(body, 'data');
    return this.callApi(AppSettings.SET_STATUS_API, 'post', body);
  }

  getyearsec(body) {
    return this.callApi(AppSettings.GET_SECTION_YEAR_API, 'post', body);
  }

  getroles(bodyData) {
    return this.callApi(AppSettings.getrolesApi, 'post', bodyData);
  }

  addedrole(bodyData) {
    return this.callApi(AppSettings.addedroloApi, 'post', bodyData);
  }

  getroledelete(bodyData) {
    return this.callApi(AppSettings.getroledeleteApi, 'post', bodyData)
  }

  enable(bodyData) {
    return this.callApi(AppSettings.enableApi, 'post', bodyData)
  }

  disable(bodyData) {
    return this.callApi(AppSettings.disableApi, 'post', bodyData)
  }

  getstaffdetails(bodyData) {
    return this.callApi(AppSettings.getStaffDataByIdApi, 'post', bodyData);
  }

  getassignedrole(bodyData) {
    return this.callApi(AppSettings.getassignedroleApi, 'post', bodyData);
  }

  getstddata1(body) {
    return this.callApi(AppSettings.GET_REGD_STD_DATA, 'post', body);
  }

  getpresentieslist(body) {
    return this.callApi(AppSettings.GET_PRESENTIES_LIST, 'post', body);
  }


  // karthik

  getregistrationaddcom() {
    const body = {
      'utype': localStorage.getItem('utype')
    };
    return this.callApi(AppSettings.GET_REGISTRATION_ADD_COM_API, 'post', body);
  }
  searchingdata(search: string) {
    const body = {
      'search': search
    }
    return this.callApi(AppSettings.SEARCHING_DATA, 'post', body);
  }
  registrationaddcom(data) {
    return this.callApi(AppSettings.REGISTRATION_ADD_COM_API, 'post', data);
  }
  getshortedlist(data) {
    return this.callApi(AppSettings.GET_ELIGIBLE_LIST_API, 'post', data);
  }
  searchdatadetails(data) {
    return this.callApi(AppSettings.SEARCH_DATA_DETAILS, 'post', data);
  }

  getselectedstd(body) {
    return this.callApi(AppSettings.GET_SELECTED_STD_API, 'post', body);
  }

  getroundbyid(body) {
    return this.callApi(AppSettings.GET_ROUND_BYID_API, 'post', body);
  }

  getbygraphbyid(body) {
    return this.callApi(AppSettings.GET_DATA_GRAPH_BYID_API, 'post', body);
  }


  // MANOJ

  // add registration
  registrationadd(data) {
    console.log(data, 'testing data for registration');
    return this.callApi(AppSettings.REGISTRATION_ADD_API, 'post', data);
  }
  searchdata(data) {
    console.log(data, 'testing search data for studenta details');
    return this.callApi(AppSettings.SEARCH_DATA, 'post', data);
  }

  getDatabycid(body) {
    return this.callApi(AppSettings.GET_DATA_BY_C_id, 'post', body);
  }

  getDatabyclg(body) {
    return this.callApi(AppSettings.GET_DATA_BY_CLG_C_id, 'post', body);
  }

  getstdDatabyclgcmpid(body) {
    return this.callApi(AppSettings.GET_STD_DATA_BY_CLG_C_id, 'post', body);
  }

  getdatabybackper(body) {
    return this.callApi(AppSettings.GET_STD_DATA_BY_PER_BAC_CLGBR_API, 'post', body);
  }

  getDatabybranch(body) {
    return this.callApi(AppSettings.GET_DATA_BY_CLG_BR_C_id, 'post', body);
  }

  getcertificate(value) {
    const body = { 'reg_no': value };
    return this.callApi(AppSettings.GET_CERTIFICATE_DET, 'post', body);
  }

  getCompanyListbyclgid(body) {
    return this.callApi(AppSettings.GET_COMPANYLIST_BY_CLGID, 'post', body);
  }

  getDatabyclgcmpid(body) {
    return this.callApi(AppSettings.GET_DATA_BY_CLGCMP_ID, 'post', body);
  }

  getStddataingraph(body) {
    return this.callApi(AppSettings.GET_STD_BY_CLGCMPBR_IDS, 'post', body);
  }

  placementdetails(data) {
    console.log(data, 'testing placement data');
    return this.callApi(AppSettings.PLACEMENT_DATA_API, 'post', data);
  }

  getUpcomingcmp(body) {
    return this.callApi(AppSettings.GET_COMPANIES_BY_DATE_API, 'post', body);
  }

  placementdetailsbyid(data) {
    console.log(data, 'testing placement by id');
    return this.callApi(AppSettings.PLACEMENT_BY_ID, 'post', data);
  }

  getCollege() {
    const body = {
      'utype': localStorage.getItem('utype')
    }
    return this.callApi(AppSettings.GET_COLLEGE_DATA, 'post', body);
  }
  getCourse() {
    const body = {
      'utype': localStorage.getItem('utype')
    };
    return this.callApi(AppSettings.COURSE_DATA, 'post', body);
  }
  getBranchdata() {
    const body = {
      'utype': localStorage.getItem('utype')
    };
    return this.callApi(AppSettings.GET_BRANCH_DATA, 'post', body);
  }
  getYear() {
    const body = {
      'utype': localStorage.getItem('utype')
    };
    return this.callApi(AppSettings.YEAR_DATA, 'post', body);
  }
  getSection() {
    const body = {
      'utype': localStorage.getItem('utype')
    };
    return this.callApi(AppSettings.SECTION_DATA, 'post', body);
  }
  callcollegeid() {
    const body = {
      'college': localStorage.getItem('college')
    };
    console.log(body);
    return this.callApi(AppSettings.CALL_COLLEGE_ID, 'post', body);
  }
  getbranchid(course: string) {
    const body = {
      'course': course,
      'dept': localStorage.getItem('dept')
    }
    console.log(body);
    return this.callApi(AppSettings.GET_BRANCH_ID, 'post', body);
  }

  GetRegdData(reg_no: string) {
    const body = {
      'reg_no': reg_no,
    }
    return this.callApi(AppSettings.GET_REGD_DATA, 'post', body);
  }

  updationreg(body) {
    return this.callApi(AppSettings.UPDATE_STD_DATA, 'post', body);
  }

  getCompanies() {
    const body = {
      'utype': localStorage.getItem('utype'),
      'role': localStorage.getItem('currentrole'),
      'reg_no': localStorage.getItem('reg_no')
    }
    return this.callApi(AppSettings.GET_COMPANIES_LIST, 'post', body);
  }

  updateregistrationaddcom(data) {
    return this.callApi(AppSettings.UPDATE_ADD_COM_API, 'post', data);
  }

  studentsplacedbyid() {
    const body = {
    };
    return this.callApi(AppSettings.GET_STUDENTSPLACED_API, 'get', body);
  }

  getCompaniesData() {
    const body = {};
    return this.callApi(AppSettings.getCompaniesData, 'get', body);
  }

  getDrivedetails(body) {
    return this.callApi(AppSettings.getdrivedetails, 'post', body);
  }

  getremainder(body) {
    return this.callApi(AppSettings.GET_REMAINDER_API, 'post', body);
  }

  addr1details(body) {
    return this.callApi(AppSettings.ADD_R1_DETAILS_API, 'post', body);
  }

  getacrdtoround(body) {
    return this.callApi(AppSettings.GET_ACC_ROUNDS_API, 'post', body);
  }
  getDatabyreg_no(body) {
    return this.callApi(AppSettings.GET_DATA_BY_REG_NO, 'post', body);
  }

  confirmmobileno(body) {
    return this.callApi(AppSettings.CHECK_MOBILE_NO, 'post', body);
  }

  getconfirmation(body) {
    return this.callApi(AppSettings.GET_CONFIRM_API, 'post', body);
  }

  verifyEmail(body) {
    return this.callApi(AppSettings.VERIFY_EMAIL_API, 'post', body);
  }

  collegebranch() {
    const body = {}
    return this.callApi(AppSettings.collegebranch, 'get', body);
  }

  getbranchwisedata(body) {
    return this.callApi(AppSettings.GET_BRANCHEWISE_DATA, 'post', body);
  }

  getdefaultdatabybranches() {
    const body = {};
    return this.callApi(AppSettings.GET_DEFAULTBRANCHEWISE_DATA, 'get', body);
  }

  deletefile(body) {
    return this.callApi(AppSettings.DELETE_FILE_API, 'post', body);
  }

  submitRound_data(value) {
    const body = {
      'reg_nos': value.reg_nos,
      'company_id': value.company_id,
    };
    console.log(value, 'App service', body);
    return this.callApi(AppSettings.GET_SUBMITROUND_DATA, 'post', body);
  }

  sendsmstostd(body) {
    return this.callApi(AppSettings.SEND_SMS_TO_SEL_STD_API, 'post', body);
  }

  getroundprogress(body) {
    return this.callApi(AppSettings.GET_ROUND_PROGRESS_API, 'post', body);
  }

  getroundsdata() {
    const body = {};
    return this.callApi(AppSettings.GET_ROUNDS_DATA_API, 'post', body);
  }

  getStddatabyregno(body) {
    return this.callApi(AppSettings.GET_STD_DATA_BY_ID_API, 'post', body);
  }

  deleterounddata(body) {
    return this.callApi(AppSettings.DELETE_ROUND_DATA_API, 'post', body);
  }
 ////api updated by me
 terms(body)
 {
   return this.callApi(AppSettings.SETTERSMS_API,'post',body);
 }
 getterms(body)
 {
   return this.callApi(AppSettings.GETTERSMS_API,'post',body);
 }

  /************************************************************************** */


  // makeFileRequest(url: string, receipt: string, date: string, id: string, files: File[]): Observable<any> {
  //   console.log(url, receipt, date, id, files);

  //   return Observable.create(observer => {
  //     let formData: FormData = new FormData(),
  //       xhr: XMLHttpRequest = new XMLHttpRequest();
  //     var length: any = files.length
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append("uploads[]", files[i], receipt);
  //       formData.append("receipt", receipt);
  //       formData.append("date", date);
  //       formData.append("id", id);
  //       formData.append("length", length);
  //     }
  //     xhr.open('POST', url, true);
  //     var serverFileName = xhr.send(formData);
  //     return serverFileName;
  //   });
  // }



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