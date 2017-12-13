import {
  Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewChild,
  Output, Input, EventEmitter, ViewContainerRef, SecurityContext, Directive
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from "@angular/forms";
import { ModalModule } from "ngx-modal";
import { CustomValidators } from 'ng2-validation';
import { IMyDpOptions, IMyDateModel, IMyOptions, IMyDate } from 'mydatepicker';
import { ControlValueAccessor } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

import { GenericValidator } from '../common/generic-validator';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';



const URL = 'http://192.168.0.129/placement_server/api/upload';
// const URL = 'http://210.16.79.137/raghuerp/jobportal/server/api/upload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

@Directive({ selector: '[ng2FileSelect]' })


export class RegisterComponent implements OnInit {
  alphabetRegex: RegExp;
  backlogRegex: string;
  rankRegex: string;
  arRegex: string;
  years15 = [];
  years12 = [];
  years10 = [];

  @ViewChild('mymodal') modal1: any;
  @ViewChild('uploadEl') uploadElRef: ElementRef;

  yy = new Date().getFullYear();
  yearT0 = this.yy - 27;
  yearT2 = this.yy - 27
  yearT5 = this.yy - 27
  mobileex: any;
  sectionid: any;
  registrationdata: any;
  year: any;
  branch: any;
  course: any;
  college: any;
  file_exist: any;
  add: any = {};
  picName: any;
  addsection: any[];
  section: any[];
  newyear: any[];
  newbranch: any[];
  newcourse: any[];
  addnew: any;
  sectiondata: any;
  yeardata: any;
  branchdata: any;
  coursedata: any;
  collegedata: any;
  reg_Form: FormGroup;
  uploadForm: FormGroup;
  register: boolean = true;
  viewregdata: boolean = true;
  basicurl: string;
  regno: string;


  reg_no: any;
  viewdata: any = [];

  stddetails = [];
  truedata: boolean;
  falsedata: boolean;

  dpdata: any;
  resumefile: any;
  technicalfiles: any = [];
  nontechnicalfiles: any = [];
  firstname;
  lastname;
  personalemail: any;
  personalmobile: any;


  genderinfo = {
    male: 'Male',
    m_id: 'Male',
    female: 'Female',
    f_id: 'Female'
  }

  getYear10() {
    this.years10 = [];
    for (var i = (this.yy - 27); i <= this.yy; i++) {
      this.years10.push(i);
    }
  }

  getYear12() {
    this.years12 = [];
    for (var i = this.yearT0 + 1; i <= this.yy; i++) {
      this.years12.push(i);
    }
  }

  getYear15() {
    this.years15 = [];
    for (var i = this.yearT2 + 1; i <= this.yy; i++) {
      this.years15.push(i);
    }
  }

  changeyear(t10) {
    this.yearT0 = parseInt(t10);
    this.getYear12();
  }

  changeyear15(t15) {
    this.yearT2 = parseInt(t15);
    this.getYear15();
  }


  public dp: FileUploader = new FileUploader(
    {
      allowedMimeType: ['image/jpeg'],
      url: URL,
      authToken: localStorage.getItem('currentUser'),
      itemAlias: 'photo',
      removeAfterUpload: false,
      maxFileSize: 520 * 580, // 2 MB
    }

  );

  public edituploader: FileUploader = new FileUploader(
    {
      allowedMimeType: ['image/jpeg'],
      url: URL,
      authToken: localStorage.getItem('currentUser'),
      itemAlias: 'editphoto',
      removeAfterUpload: false,
      maxFileSize: 520 * 580, // 2 MB
    }

  );

  public editresume: FileUploader = new FileUploader(
    {
      allowedMimeType: ['image/jpeg'],
      url: URL,
      authToken: localStorage.getItem('currentUser'),
      itemAlias: 'editresume',
      removeAfterUpload: false,
      maxFileSize: 520 * 580, // 2 MB
    }

  );

  public resume: FileUploader = new FileUploader(
    {
      allowedFileType: ["pdf"],
      url: URL,
      authToken: localStorage.getItem('currentUser'),
      itemAlias: 'resume',
      maxFileSize: 2 * 1024 * 1024, // 2 MB
      removeAfterUpload: false
    }

  );

  public technical: FileUploader = new FileUploader(
    {
      allowedFileType: ["pdf"],
      url: URL,
      authToken: localStorage.getItem('currentUser'),
      itemAlias: 'technical',
      maxFileSize: 2 * 1024 * 1024, // 2 MB
      removeAfterUpload: false
    }
  );

  public nontechnical: FileUploader = new FileUploader(
    {
      allowedFileType: ["pdf"],
      url: URL,
      authToken: localStorage.getItem('currentUser'),
      itemAlias: 'nontechnical',
      maxFileSize: 2 * 1024 * 1024, // 2 MB
      removeAfterUpload: false
    }

  );



  response: string;

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableSince: { year: new Date().getFullYear() - 15, month: new Date().getMonth() + 1, day: new Date().getDate() }
  };

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private http: Http, private el: ElementRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.genericValidator = new GenericValidator(this.validationMessages);

    this.validationMessages = {
      college_name: {
        required: 'College Name is required',
        maxLength: 'College Name should be less than 100 characters'
      },
      course: {
        required: 'Course Name is required',
        maxLength: 'Course Name should be less than 100 characters'
      },
      branch: {
        required: 'Branch Name is required',
        maxLength: 'Branch Name should be less than 100 characters'
      },
      year: {
        required: 'Year is required',
        maxLength: 'year should be less than 10 characters'
      },
      batch: {
        required: 'Batch is required',
        maxLength: 'Batch should be less than 10 characters'
      },
      section: {
        required: 'Section is required',
        maxLength: 'Section should be less than 10 characters'
      },
      university_reg_number: {
        required: 'Registeration Number is required',
        maxLength: 'Registeration Number should be less than 30 characters'
      },
      first_name: {
        required: 'First Name is required',
        maxLength: 'First Name should be less than 100 characters',
        pattern: 'First Name should be Alphabets',
      },
      last_name: {
        required: 'Last Name is required',
        maxLength: 'Last Name should be less than 100 characters',
        pattern: 'Last Name should be Alphabets',
      },
      gender: {
        required: 'Gender is required',
        maxLength: 'Gender should be less than 10 characters'
      },
      dob: {
        required: 'Date of Birth is required',
        maxLength: 'Date of Birth should be less than 10 characters'
      },
      aadhaar_number: {
        required: 'Aadhaar Number is required',
        maxLength: 'Aadhaar Number should be less than 20 characters',
        pattern: 'Aadhaar Number should be 12 digit number',
      },
      email_id: {
        required: 'Email Id is required',
        maxLength: 'Email Id should be less than 255 characters',
        pattern: 'Email Id should Contain atleast @ , . characters',
      },
      fathers_name: {
        required: 'Father Name is required',
        maxLength: 'Father Name should be less than 100 characters',
        pattern: 'Father Name should be Alphabets',
      },
      mothers_name: {
        required: 'Mother Name is required',
        maxLength: 'Mother Name should be less than 100 characters',
        pattern: 'Mother Name should be Alphabets',
      },
      mobile_number: {
        required: 'Mobile Number is required',
        maxLength: 'Mobile Number should be less than 10 characters ',
        pattern: 'Alternate Mobile number should start with [789]{1}[0-9]{9}'
      },
      alternate_mobile_number: {
        required: 'Alternate Mobile Number is required',
        maxLength: 'Alternate Mobile Number should be less than 10 characters ',
        pattern: 'Alternate Mobile number should start with [789]{1}[0-9]{9}'
      },
      address: {
        required: 'Address is required',
        maxLength: 'Address should be less than 255 characters'
      },
      backlogs: {
        required: 'Backlogs is required',
        maxLength: 'Backlogs should be less than 20 characters',
        pattern: 'you entered number is exceeding 2 digits'
      },
      x_board: {
        required: 'X Board is required',
        maxLength: 'X Board should be less than 50 characters'
      },
      x_percentage: {
        required: 'X percentage is required',
        maxLength: 'X percentage should be less than 50 characters'
      },
      x_year_of_passing: {
        required: 'X year of passing is required',
        maxLength: 'X year of passing should be less than 50 characters'
      },
      xII_board: {
        required: 'XII Board is required',
        maxLength: 'XII Board should be less than 50 characters'
      },
      xII_percentage: {
        required: 'XII Percentage is required',
        maxLength: 'XII Percentage should be less than 50 characters'
      },
      xII_year_of_passing: {
        required: 'XII Year of passing is required',
        maxLength: 'XII Year of passing should be less than 50 characters'
      },
      btech_board: {
        required: 'Btech board is required',
        maxLength: 'Btech board should be less than 50 characters'
      },
      btech_percentage: {
        required: 'Btech percentage is required',
        maxLength: 'Btech percentage should be less than 50 characters'
      },
      btech_year_of_passing: {
        required: 'Btech year of passing is required',
        maxLength: 'Btech year of passing should be less than 50 characters'
      },
      eamcet_rank: {
        required: 'Eamcet Rank is required',
        maxLength: 'Eamcet Rank should be less than 255 characters',
        pattern: 'you entered number is exceeding 6 digits'
      },
      father_proffesion: {
        required: 'Father Proffesion is required',
        maxLength: 'Father Proffesion should be less than 255 characters'
      },
      nationalitiy: {
        required: 'Nationalitiy is required',
        maxLength: 'Nationalitiy should be less than 255 characters',
        pattern: 'Nationalitiy should be Alphabets',
      },
      language_known: {
        required: 'Languages is required',
        maxLength: 'Languages should be less than 255 characters'
      },
      dp: {
        required: 'Languages is required',
      },
      resume: {
        required: 'Languages is required',
      }
    };



  }

  ngAfterViewInit(): void {
    if (this.reg_Form) {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.reg_Form.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.reg_Form);
      });
    }
    if (this.uploadForm) {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.uploadForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.uploadForm);
      });
    }
  }
  emailRegex;
  ngOnInit() {
    this._apiService.page = "register";
    this.basicurl = this._apiService.basicurl;
    this.regno = localStorage.getItem('reg_no');
    this.getstddatabyregno(this.regno);
    this.getstddata();
    this.getCollege();
    this.getCourse();
    this.getBranchdata();
    this.getYear();
    this.getsection();
    this.getYear10();
    this.getYear12();
    this.getYear15();
    this.getconfirmation();
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // this.mobileex=/^\w+([7-9]{1}?\w+)*\w([0-9]{9}?\w+)+$/;
    this.mobileex = "[7-9]{1}[0-9]{9}";
    this.arRegex = "[0-9]{12}";
    this.rankRegex = "[0-9]{1,6}";
    this.backlogRegex = "^[0-9]{0,2}$";
    this.alphabetRegex = /^[a-zA-Z ]*$/;

    this.reg_Form = this.fb.group({
      'college_name': ['', [Validators.required, Validators.maxLength(255)]],
      'course': ['', [Validators.required, Validators.maxLength(30)]],
      'branch': ['', [Validators.required, Validators.maxLength(30)]],
      'batch': ['', [Validators.required, Validators.maxLength(30)]],
      'year': ['', [Validators.required, Validators.maxLength(30)]],
      'section': ['', [Validators.required, Validators.maxLength(30)]],
      'university_reg_number': ['', [Validators.required, Validators.maxLength(255)]],
      'first_name': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'last_name': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'gender': ['', [Validators.required, Validators]],
      'dob': ['', [Validators.required, Validators]],
      'aadhaar_number': ['', [Validators.required, Validators.maxLength(12), Validators.pattern(this.arRegex)]],
      'email_id': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.emailRegex)]],
      'fathers_name': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'mothers_name': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'mobile_number': ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.mobileex)]],
      'alternate_mobile_number': ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.mobileex)]],
      'address': ['', [Validators.required, Validators.maxLength(255)]],
      'backlogs': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.backlogRegex)]],
      'x_board': ['', [Validators.required, Validators.maxLength(255)]],
      'x_percentage': ['', [Validators.required, Validators.maxLength(255)]],
      'x_year_of_passing': ['', [Validators.required, Validators.maxLength(255)]],
      'xII_board': ['', [Validators.required, Validators.maxLength(255)]],
      'xII_percentage': ['', [Validators.required, Validators.maxLength(255)]],
      'xII_year_of_passing': ['', [Validators.required, Validators.maxLength(255)]],
      'btech_board': ['', [Validators.required, Validators.maxLength(255)]],
      'btech_percentage': ['', [Validators.required, Validators.maxLength(255)]],
      'btech_year_of_passing': ['', [Validators.required, Validators.maxLength(255)]],
      'eamcet_rank': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.rankRegex)]],
      'father_proffesion': ['', [Validators.required, Validators.maxLength(255)]],
      'nationalitiy': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'language_known': ['', [Validators.required, Validators.maxLength(255)]],
    });

    this.uploadForm = this.fb.group({
      'dp': ['', [Validators.required]],
      'resume': ['', [Validators.required]],
    });

    

    // profile pic

    this.dp.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.dp.onCompleteItem = (fileItem: FileItem, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", fileItem, status, response);
    };

    this.dp.onAfterAddingFile = f => {
      if (this.dp.queue.length > 1) {
        this.dp.removeFromQueue(this.dp.queue[0]);
      }

    };

    this.dp.onSuccessItem = (fileItem: FileItem, response: any) => {
      if (JSON.parse(response).success == true) {
        this.toastr.success('Upload Complete!', 'Success!');
      } else {
        this.toastr.error('No data imported, please check if the file is in correct format', 'Error!');
      }
    }

    this.dp.onErrorItem = (fileItem: FileItem, response: any) => {
      this.toastr.error('Upload Failed!', 'Error!');
    }

    this.dp.onBeforeUploadItem = (fileItem: FileItem) => {
      this.dp.options.additionalParameter = {
        reg_no: localStorage.getItem('reg_no'),
      };
      console.log('ImageUpload:uploaded:', fileItem);
    };

    this.dp.onCancelItem = (fileItem: FileItem, response: any, status: any, header: any) => {
      console.log('ImageUpload:uploaded:', fileItem, status, response);
    }


    // profile pic edit

    this.edituploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.edituploader.onCompleteItem = (fileItem: FileItem, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", fileItem, status, response);
    };

    this.edituploader.onAfterAddingFile = f => {
      if (this.edituploader.queue.length > 1) {
        this.edituploader.removeFromQueue(this.edituploader.queue[0]);
      }
    };

    this.edituploader.onSuccessItem = (fileItem: FileItem, response: any) => {
      if (JSON.parse(response).success == true) {
        this.toastr.success('Upload Complete!', 'Success!');
        this.getstddata();
      }
      else {
        this.toastr.error('No data imported, please check if the file is in correct format', 'Error!');
      }
    }

    this.edituploader.onErrorItem = (fileItem: FileItem, response: any) => {
      this.toastr.error('Upload Failed!', 'Error!');
    }

    this.edituploader.onBeforeUploadItem = (fileItem: FileItem) => {
      this.edituploader.options.additionalParameter = {
        reg_no: localStorage.getItem('reg_no'),
      };
      console.log('ImageUpload:uploaded:', fileItem);
    };

    this.edituploader.onCancelItem = (fileItem: FileItem, response: any, status: any, header: any) => {
      console.log('ImageUpload:uploaded:', fileItem, status, response);
    }

    // resume

    this.resume.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.resume.onCompleteItem = (fileItem: FileItem, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", fileItem, status, response);
    };

    this.resume.onSuccessItem = (fileItem: FileItem, response: any) => {
      if (JSON.parse(response).success == true) {
        this.toastr.success('Upload Complete!', 'Success!');

      }
      else {
        this.toastr.error('No data imported, please check if the file is in correct format', 'Error!');
      }
    }

    this.resume.onAfterAddingFile = f => {
      if (this.resume.queue.length > 1) {
        this.resume.removeFromQueue(this.resume.queue[0]);
      }
    };

    this.resume.onErrorItem = (fileItem: FileItem, response: any) => {
      this.toastr.error('Upload Failed!', 'Error!');
    }

    this.resume.onBeforeUploadItem = (fileItem: FileItem) => {
      this.resume.options.additionalParameter = {
        reg_no: localStorage.getItem('reg_no'),
      };
      console.log('ImageUpload:uploaded:', fileItem);
    };

    this.resume.onCancelItem = (fileItem: FileItem, response: any, status: any, header: any) => {
      console.log('ImageUpload:uploaded:', fileItem, status, response);
    }

    // edit resume

    this.editresume.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.editresume.onCompleteItem = (fileItem: FileItem, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", fileItem, status, response);
    };

    this.editresume.onAfterAddingFile = f => {
      if (this.editresume.queue.length > 1) {
        this.editresume.removeFromQueue(this.editresume.queue[0]);
      }
    };

    this.editresume.onSuccessItem = (fileItem: FileItem, response: any) => {
      if (JSON.parse(response).success == true) {
        this.toastr.success('Upload Complete!', 'Success!');
        this.getstddata();
      }
      else {
        this.toastr.error('No data imported, please check if the file is in correct format', 'Error!');
      }
    }

    this.editresume.onErrorItem = (fileItem: FileItem, response: any) => {
      this.toastr.error('Upload Failed!', 'Error!');
    }

    this.editresume.onBeforeUploadItem = (fileItem: FileItem) => {
      this.editresume.options.additionalParameter = {
        reg_no: localStorage.getItem('reg_no'),
      };
      console.log('ImageUpload:uploaded:', fileItem);
    };

    this.editresume.onCancelItem = (fileItem: FileItem, response: any, status: any, header: any) => {
      console.log('ImageUpload:uploaded:', fileItem, status, response);
    }

    // technical

    this.technical.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.technical.onCompleteItem = (fileItem: FileItem, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", fileItem, status, response);
    };

    this.technical.onSuccessItem = (fileItem: FileItem, response: any) => {
      if (JSON.parse(response).success == true) {
        this.toastr.success('Upload Complete!', 'Success!');
      } if (JSON.parse(response).msg == 'File Overrided Successfully.') {
        this.toastr.warning('File Overrided Successfully.', 'Success!');
      } else {
        this.toastr.error('No data imported, please check if the file is in correct format', 'Error!');
      }
    }

    this.technical.onAfterAddingFile = f => {
      console.log('after upload', this.technical.queue);
      for (let t = 0; t < this.technical.queue.length; t++) {

        var fd = this.technical.queue[t].file.name;

        var dst = this.technical.queue.filter(function (obj) {
          return obj.file.name == fd;
        })

        if (dst.length > 1) {
          this.technical.queue.splice(t, 1);
        }

      }
    };

    this.technical.onErrorItem = (fileItem: FileItem, response: any) => {
      this.toastr.error('Upload Failed!', 'Error!');
    }



    this.technical.onBeforeUploadItem = (fileItem: FileItem) => {
      this.technical.options.additionalParameter = {
        reg_no: localStorage.getItem('reg_no'),
      };
      console.log('ImageUpload:uploaded:', fileItem);
    };

    this.technical.onCancelItem = (fileItem: FileItem, response: any, status: any, header: any) => {
      console.log('ImageUpload:uploaded:', fileItem, status, response);
    }


    // Non-technical

    this.nontechnical.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.nontechnical.onCompleteItem = (fileItem: FileItem, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", fileItem, status, response);
    };

    this.nontechnical.onSuccessItem = (fileItem: FileItem, response: any) => {
      if (JSON.parse(response).success == true) {
        this.toastr.success('Upload Complete!', 'Success!');
      } if (JSON.parse(response).msg == 'File Overrided Successfully.') {
        this.toastr.warning('File Overrided Successfully.', 'Success!');
      } else {
        this.toastr.error('No data imported, please check if the file is in correct format', 'Error!');
      }
    }

    this.nontechnical.onErrorItem = (fileItem: FileItem, response: any) => {
      this.toastr.error('Upload Failed!', 'Error!');
    }

    this.nontechnical.onBeforeUploadItem = (fileItem: FileItem) => {
      this.nontechnical.options.additionalParameter = {
        reg_no: localStorage.getItem('reg_no'),
      };
      console.log('ImageUpload:uploaded:', fileItem);
    };

    this.nontechnical.onAfterAddingFile = f => {
      console.log('after upload', this.nontechnical.queue);
      for (let t = 0; t < this.nontechnical.queue.length; t++) {
        var fd = this.nontechnical.queue[t].file.name;
        var dst = this.nontechnical.queue.filter(function (obj) {
          return obj.file.name == fd;
        })
        if (dst.length > 1) {
          this.nontechnical.queue.splice(t, 1);
        }
      }
    };

    this.nontechnical.onCancelItem = (fileItem: FileItem, response: any, status: any, header: any) => {
      console.log('ImageUpload:uploaded:', fileItem, status, response);
    }

  }

  html;
  photoURL(id) {
    return this.basicurl + '/' + id;
  }

  openupload: boolean;
  openform: boolean;


  getCollege() {
    this._apiService.getCollege().subscribe(data => {
      console.log(data, 'college data');
      this.collegedata = data.data;
    });
  }

  getCourse() {
    this._apiService.getCourse().subscribe(data => {
      console.log(data, 'course data');
      this.coursedata = data.data;
      console.log(this.coursedata)
    })
  }

  getBranchdata() {
    this._apiService.getBranchdata().subscribe(data => {
      console.log(data, 'branch data');
      this.branchdata = data.data;
    })
  }

  getYear() {
    this._apiService.getYear().subscribe(data => {
      console.log(data, 'year data');
      this.yeardata = data.data;
    })
  }

  getsection() {
    this._apiService.getSection().subscribe(data => {
      console.log(data, 'section data');
      this.sectiondata = data.data;
    })
  }

  xpassyear;
  onYearChange1(value) {
    this.xpassyear = value;
    // console.log(this.reg_Form.value.x_year_of_passing, value);
  }

  xiithpassyear;
  onYearChange2(value) {
    this.xiithpassyear = value;
    // console.log(this.xthpass, value);
  }

  btechpassyear;
  onYearChange3(value) {
    this.btechpassyear = value;
    // console.log(this.btechpassyear,'-', value);
  }

  details1 = [];
  getstddatabyregno(dats) {
    const body = {};
    body['reg_no'] = dats;
    this._apiService.getStddatabyregno(body).subscribe(data => {
      console.log(data);
      this.details1 = data.data.data;
    });
  }

  callcollege(value) {
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.college = value.target.value;
    this.newcourse = [];
    console.log('coming', this.coursedata, );
    let clg = '';
    for (var j = 0; j < this.coursedata.length; j++) {
      if (this.addnew == this.coursedata[j].cid) {
        clg = this.coursedata[j].college;
        break;
      }
    }
    for (var i = 0; i < this.coursedata.length; i++) {
      if (clg == this.coursedata[i].college) {
        this.newcourse.push(this.coursedata[i]);
        console.log('testing');
      }
    }
    console.log('coming', this.coursedata, this.newcourse);
  }

  callcourse(value) {
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.course = value.target.value;
    this.newbranch = [];
    console.log('coming data', this.branchdata);
    let branch = '';
    for (var j = 0; j < this.branchdata.length; j++) {
      if (this.addnew == this.branchdata[j].course_id) {
        this.newbranch.push(this.branchdata[j]);
        console.log(this.newbranch, 'dfaksdfhasdhfjasfsdf');
      }
    }
    console.log('coming data', this.branchdata, this.newbranch)
  }

  callbranch(value) {
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.branch = value.target.value;
    this.newyear = [];
    let year = '';
    console.log('coming data', this.yeardata);
    for (var j = 0; j < this.yeardata.length; j++) {
      if (this.addnew == this.yeardata[j].bid) {
        year = this.yeardata[j].year;
        this.newyear.push(this.yeardata[j]);
        console.log(year, 'year data');
      }
    }
    console.log('coming data', this.yeardata, this.newyear);
  }

  callyear(value) {
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.year = value.target.value;
    console.log(this.addnew);
    this.addsection = [];
    let section = '';
    console.log('coming data', this.sectiondata);
    for (var j = 0; j < this.sectiondata.length; j++) {
      if (this.addnew == this.sectiondata[j].year) {
        // section=this.sectiondata[j].section;
        this.addsection.push(this.sectiondata[j]);
        console.log(this.addsection, 'section data');
      }
    }
    console.log('coming data', this.sectiondata, this.addsection);
  }

  callsection(value) {
    console.log(value.target.value);
    this.section = value.target.value;
    console.log(this.section, 'section id data');
  }

  registrationadd() {
    console.log('this is how game of thrones ends');
    const value = {
      college_name: this.reg_Form.controls['college_name'].value,
      branch: this.reg_Form.controls['branch'].value,
      course: this.reg_Form.controls['course'].value,
      year: this.reg_Form.controls['year'].value,
      section: this.reg_Form.controls['section'].value,
      university_reg_number: this.reg_Form.controls['university_reg_number'].value,
      first_name: this.reg_Form.controls['first_name'].value,
      last_name: this.reg_Form.controls['last_name'].value,
      gender: this.reg_Form.controls['gender'].value,
      dob: this.reg_Form.controls['dob'].value.formatted,
      aadhaar_number: this.reg_Form.controls['aadhaar_number'].value,
      email_id: this.reg_Form.controls['email_id'].value,
      fathers_name: this.reg_Form.controls['fathers_name'].value,
      mothers_name: this.reg_Form.controls['mothers_name'].value,
      mobile_number: this.reg_Form.controls['mobile_number'].value,
      alternate_mobile_number: this.reg_Form.controls['alternate_mobile_number'].value,
      address: this.reg_Form.controls['address'].value,
      backlogs: this.reg_Form.controls['backlogs'].value,
      x_board: this.reg_Form.controls['x_board'].value,
      x_percentage: this.reg_Form.controls['x_percentage'].value,
      x_year_of_passing: this.reg_Form.controls['x_year_of_passing'].value,
      xII_board: this.reg_Form.controls['xII_board'].value,
      xII_percentage: this.reg_Form.controls['xII_percentage'].value,
      xII_year_of_passing: this.reg_Form.controls['xII_year_of_passing'].value,
      btech_board: this.reg_Form.controls['btech_board'].value,
      btech_percentage: this.reg_Form.controls['btech_percentage'].value,
      btech_year_of_passing: this.reg_Form.controls['btech_year_of_passing'].value,
      eamcet_rank: this.reg_Form.controls['eamcet_rank'].value,
      father_proffesion: this.reg_Form.controls['father_proffesion'].value,
      nationalitiy: this.reg_Form.controls['nationalitiy'].value,
      language_known: this.reg_Form.controls['language_known'].value
    }
    console.log(value);
    this._apiService.registrationadd(value)
      .subscribe(data => {
        // this.toastr.success('successfully submitted', 'Success!!');
        this.registrationdata = data.data;
        this.openinsert();
        // this.getstddata();
        // console.log(this.registrationdata, 'testing registration data');
        // this._apiService.makeFileRequest('http://192.168.0.129/placement_server/api/upload', value.university_reg_number, 'data', 'this.picName', this.picName).subscribe(data => {
        // })
      });
  }

  updatestd() {
    const value = {

      college_name: this.reg_Form.controls['college_name'].value,
      branch: this.reg_Form.controls['branch'].value,
      course: this.reg_Form.controls['course'].value,
      year: this.reg_Form.controls['year'].value,
      section: this.reg_Form.controls['section'].value,
      university_reg_number: this.reg_Form.controls['university_reg_number'].value,
      first_name: this.reg_Form.controls['first_name'].value,
      last_name: this.reg_Form.controls['last_name'].value,
      gender: this.reg_Form.controls['gender'].value,
      dob: this.reg_Form.controls['dob'].value.formatted,
      aadhaar_number: this.reg_Form.controls['aadhaar_number'].value,
      email_id: this.reg_Form.controls['email_id'].value,
      fathers_name: this.reg_Form.controls['fathers_name'].value,
      mothers_name: this.reg_Form.controls['mothers_name'].value,
      mobile_number: this.reg_Form.controls['mobile_number'].value,
      alternate_mobile_number: this.reg_Form.controls['alternate_mobile_number'].value,
      address: this.reg_Form.controls['address'].value,
      backlogs: this.reg_Form.controls['backlogs'].value,
      x_board: this.reg_Form.controls['x_board'].value,
      x_percentage: this.reg_Form.controls['x_percentage'].value,
      x_year_of_passing: this.reg_Form.controls['x_year_of_passing'].value,
      xII_board: this.reg_Form.controls['xII_board'].value,
      xII_percentage: this.reg_Form.controls['xII_percentage'].value,
      xII_year_of_passing: this.reg_Form.controls['xII_year_of_passing'].value,
      btech_board: this.reg_Form.controls['btech_board'].value,
      btech_percentage: this.reg_Form.controls['btech_percentage'].value,
      btech_year_of_passing: this.reg_Form.controls['btech_year_of_passing'].value,
      eamcet_rank: this.reg_Form.controls['eamcet_rank'].value,
      father_proffesion: this.reg_Form.controls['father_proffesion'].value,
      nationalitiy: this.reg_Form.controls['nationalitiy'].value,
      language_known: this.reg_Form.controls['language_known'].value
    }

    console.log(value);
    this._apiService.updationreg(value)
      .subscribe(data => {
        this.toastr.success('updated successfully', 'Success!!');
        this.registrationdata = data.data;
        this.getstddata();
        // console.log(this.registrationdata, 'testing registration data');
        // this._apiService.makeFileRequest('http://192.168.0.129/placement_server/api/upload', value.university_reg_number, 'data', 'this.picName', this.picName).subscribe(data => {
        // })
      });
  }




  getstddata() {
    const body = {}
    body['reg_no'] = localStorage.getItem('reg_no');
    body['utype'] = localStorage.getItem('utype');
    body['college'] = localStorage.getItem('college');
    console.log(body, 'test');
    this._apiService.getstddata1(body).subscribe(data => {
      this.stddetails = data.data.data;
      this.viewdata = data.data.data;
      console.log(this.viewdata, 'real data');
      if (data.data.data) {
        this.truedata = false;
        this.viewregdata = true;
        this.reg_Form.patchValue(this.stddetails);
        this.reg_Form.patchValue({ dob: { formatted: this.stddetails['dob'] } });
        console.log(this.stddetails['dob'], 'dob');
        localStorage.setItem('email', this.viewdata.email_id);
        localStorage.setItem('mobile', this.viewdata.mobile_number);
        this.personalemail = this.viewdata.email_id;
        this.personalmobile = this.viewdata.mobile_number;
        this.firstname = this.viewdata.first_name;
        this.lastname = this.viewdata.last_name;
      }
      else {
        this.falsedata = true;
        this.openform = true;
        this.truedata = false;
        this.viewregdata = false;
      }

      if (data.data.dp) {
        this.dpdata = data.data.dp;
      }
      if (data.data.resume) {
        this.resumefile = data.data.resume;
      }
      if (data.data.technical) {
        this.technicalfiles = data.data.technical;
        for (let tech = 0; tech < this.technicalfiles.length; tech++) {
          this.technical = this.technicalfiles.queue[tech].file.name;
        }
        // this.nontechnical.queue = data.data.technical;
      }
      if (data.data.nontechnical) {
        this.nontechnicalfiles = data.data.nontechnical;
      }
      // console.log(this.dpdata, this.resumefile, this.technicalfiles, this.nontechnicalfiles, 'upload files');

      console.log(this.stddetails, this.viewdata, this.personalmobile, this.personalemail, 'student details');
    });
  }

  openinsert() {
    this.openupload = true;
    this.openform = false;
  }

  opensuccess() {
    this.toastr.success('successfully submitted', 'Success!!');
    this.openupload = false;
    this.openform = false;
    this.register = false;
    this.getstddata();
  }

  onChange(event) {
    var files = event.srcElement.files;
    console.log(files, 'file testing');
    this.picName = files;
    this.file_exist = this.picName.length;
    console.log(this.picName, 'testing name of the pic');
    console.log(this.file_exist, 'testing wether the is exist or not');
  }

  openeditform() {
    this.truedata = true;
    this.viewregdata = false;
  }





  emaildata;
  emailstatus;
  // mobiledata;
  // mobilestatus;
  otpenable: boolean;
  getconfirmation() {
    const body = {};
    body['utype'] = localStorage.getItem('utype');
    body['reg_no'] = localStorage.getItem('reg_no');
    body['mobile_no'] = localStorage.getItem('mobile');
    body['email'] = localStorage.getItem('email');
    console.log(body, 'phno,email')
    this._apiService.getconfirmation(body)
      .subscribe(data => {
        console.log(data, '46');
        if (data.data.mobilesuccess == true) {
          this.otpenable = true;
        }
        else {
          this.otpenable = false;
        }
      }
      );
  }

  mobilecheck(form) {
    console.log(form.value);
    const body = {};
    body['otp'] = form.value.otp;
    body['utype'] = localStorage.getItem('utype');
    body['reg_no'] = localStorage.getItem('reg_no');
    body['mobile_no'] = this.personalmobile;
    console.log(body);
    this._apiService.confirmmobileno(body)
      .subscribe(data => {
        console.log(data, data.data.data, '46');
        if (data.data.data == true) {
          this.toastr.success('Verified successfully..!', 'Success!');
          form.resetForm();
          this.modal1.close();
          this.getstddata();
        } else {
          this.toastr.warning('Entered OTP is not valid', 'Warning!');
        }
      }
      );
  }

  resendotp() {
    const body = {};
    body['utype'] = localStorage.getItem('utype');
    body['reg_no'] = localStorage.getItem('reg_no');
    body['first_name'] = this.firstname;
    body['last_name'] = this.lastname;
    body['mobile_no'] = this.personalmobile;
    console.log(body);
    this._apiService.reSendotp(body)
      .subscribe(data => {
        console.log(data);
        if (data.data.success == true) {
          this.toastr.success('OTP has sent to Your mobile..!', 'Success!');
          this.getconfirmation();
          this.modal1.close();

        }
      }
      );
  }

  verifyemail() {
    const body = {};
    body['utype'] = localStorage.getItem('utype');
    body['reg_no'] = localStorage.getItem('reg_no');
    body['first_name'] = this.firstname;
    body['last_name'] = this.lastname;
    body['email_id'] = this.personalemail;
    console.log(body);
    this._apiService.verifyEmail(body)
      .subscribe(data => {
        console.log(data);
        if (data.data.success == true) {
          this.toastr.success('Email has sent to Your Email Id..!', 'Success!');
        }
      }
      );
  }

  getyears = [];
  getbatchwiseyear() {
    var today = new Date();
    this.yy = today.getFullYear() + 20;
    for (var i = (this.yy - 20); i <= this.yy; i++) {
      this.getyears.push(i);
    }
    console.log(this.getyears, 'getyearsdata');
  }

}