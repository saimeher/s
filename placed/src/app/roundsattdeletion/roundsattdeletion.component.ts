import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, ElementRef, ViewContainerRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControlName, FormArray, FormArrayName } from '@angular/forms';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from '../common/generic-validator';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-roundsattdeletion',
  templateUrl: './roundsattdeletion.component.html',
  styleUrls: ['./roundsattdeletion.component.css']
})

export class RoundsattdeletionComponent implements OnInit {
  backlogRegex: string;
  date1: string;
  details = [];
  rowdata: any = {};
  details1 = [];

  displayMessage: { [key: string]: string } = {};

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('editcompaniesdata') modal: any;


  public filterQuery = "";
  public rowsOnPage = 6;
  public sortBy = "";
  public sortOrder = "asc";
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 }
  };

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.validationMessages = {
      company: {
        required: 'company Name is required',
        maxLength: 'company Name should be less than 255 characters'
      },


    };

  }





  d = new Date();
  public model: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };
  ngOnInit() {

    this._apiService.page = "roundsattdeletion";
    console.log(this.model, this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate(), 'date');
    this.date1 = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate();
    this.getRoundsdata();
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.backlogRegex = "^[0-9]{0,2}$";
  }


  getRoundsdata() {
    this._apiService.getroundsdata().subscribe(data => {
      console.log(data);
      this.details = data.data.data;
    });
  }

  getstddatabyregno(data2) {
    console.log(data2);
    const body = {};
    body['reg_no'] = data2;
    this._apiService.getStddatabyregno(body).subscribe(data => {
      console.log(data);
      this.details1 = data.data.data;
    });
  }

  deleteeachitem(dat2) {

    const body = {};
    body['r_id'] = dat2.id;
    body['c_round'] = dat2.rounds;
    body['c_id'] = dat2.company_id;
    console.log(dat2, body);
    this._apiService.deleterounddata(body).subscribe(data => {
      console.log(data);
      // this.details = data.data.data;
      if (data.data.data == '1') {
        this.toastr.success('Deleted Successfully', 'Success..!');
        this.getRoundsdata();
      }
    });
  }





}
