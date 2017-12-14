import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { GenericValidator } from '../common/generic-validator';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { ApiService } from '../services/api.service';
import { ModalModule } from "ngx-modal";

@Component({
  selector: 'app-rolesassign',
  templateUrl: './rolesassign.component.html',
  styleUrls: ['./rolesassign.component.css']
})
export class RolesassignComponent implements OnInit {

  systemForm: FormGroup;
  details = [];
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.validationMessages = {
      reg_no: {
        required: 'Please Select Name'
      },
      role: {
        required: 'Please Select Role'
      },
      email: {
        required: 'Please Select Email'
      },
      name: {
        required: 'Please Select Name'
      },
      college: {
        required: 'Please Select College'
      },
      department: {
        required: 'Please Select Department'
      },
      mobile: {
        required: 'Please Select Mobile'
      }
    }
  }

  ngOnInit() {
    this._apiService.page = "roleassign";
    this.roles();
    this.update();
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.systemForm = this.fb.group({
      'reg_no': ['', [Validators.required, Validators.maxLength(255)]],
      'role': ['', [Validators.required, Validators.maxLength(255)]],
      'email': ['', [Validators.required, Validators.maxLength(255)]],
      'name': ['', [Validators.required, Validators.maxLength(255)]],
      'college': ['', [Validators.required, Validators.maxLength(255)]],
      'department': ['', [Validators.required, Validators.maxLength(255)]],
      'mobile': ['', [Validators.required, Validators.maxLength(255)]]
    });

  }

  roles() {
    const bodyData = {};
    bodyData['utype'] = localStorage.getItem('utype')
    this._apiService.getroles(bodyData)
      .subscribe(response => {
        this.details = response.data.data;
        console.log(this.details, 'roles');
      });
  }

  addFormStatus = false;

  showAddForm() {
    this.addFormStatus = true;
  }

  hideAddForm() {
    this.addFormStatus = false;
    this.clg_fullname = '';
    this.dept_fullname = '';
    this.systemForm.reset();
  }

  errorMessage;

  addrole() {
    const bodyData = {};
    bodyData['reg_no'] = this.systemForm.controls['reg_no'].value;
    bodyData['role'] = this.systemForm.controls['role'].value;
    bodyData['email'] = this.systemForm.controls['email'].value;
    bodyData['name'] = this.systemForm.controls['name'].value;
    bodyData['college'] = this.systemForm.controls['college'].value;
    bodyData['department'] = this.systemForm.controls['department'].value;
    bodyData['mobile'] = this.systemForm.controls['mobile'].value;
    this._apiService.addedrole(bodyData)
      .subscribe(data => {
        if (data.success == true) {
          this.errorMessage = 'successful Updated.';
          this.toastr.success(this.errorMessage, 'Success!!');
          // confirm(this.errorMessage);
          this.systemForm.reset();
          this.roles();
        } else {
          this.errorMessage = data.error;
          this.toastr.warning(this.errorMessage, 'Success!!');
          confirm(this.errorMessage);
        }
      });
  }

  tot_users = [];

  update() {
    const bodyData = {};
    bodyData['utype'] = localStorage.getItem('utype')
    this._apiService.getstaffdetails(bodyData).subscribe(data => {
      if (data.success) {
        this.tot_users = data.data.data;
      }
    });
  }

  delete(data) {
    console.log(data);
    const bodyData = {};
    // bodyData['token'] = localStorage.getItem('currentUser');
    bodyData['role'] = localStorage.getItem('role');
    bodyData['utype'] = localStorage.getItem('utype');
    bodyData['id'] = data.pr_id;
    bodyData['reg_no'] = data.reg_no;
    this._apiService.getroledelete(bodyData)
      .subscribe(data => {
        if (data.success == true) {
          this.roles();
        }
      });
  }

  enable(data) {
    const bodyData = {};
    bodyData['reg_no'] = data.reg_no;
    bodyData['utype'] = localStorage.getItem('utype');
    this._apiService.enable(bodyData)
      .subscribe(data => {
        this.roles();
      });
  }

  disable(data) {
    const bodyData = {};
    bodyData['reg_no'] = data.reg_no;
    bodyData['utype'] = localStorage.getItem('utype');
    this._apiService.disable(bodyData)
      .subscribe(data => {
        this.roles();
      });
  }
  ind_staff_data: any = [];
  clg_fullname = '';
  dept_fullname = '';
  getdataofstf(value) {
    console.log(value.target.value);
    this.clg_fullname = '';
    this.dept_fullname = '';
    const body = {};
    body['reg_no'] = value.target.value;
    this._apiService.getDatabyreg_no(body).subscribe(data => {

      this.ind_staff_data = data.data.data;
      console.log(this.ind_staff_data);
      this.clg_fullname = this.ind_staff_data.clg_fullname;
      this.dept_fullname = this.ind_staff_data.department_name;
      this.systemForm.patchValue(this.ind_staff_data);
    })
  }

}
