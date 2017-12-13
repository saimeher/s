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
  check;
  dat;
  data;
  data1;
  true1 =false;
  regno = localStorage.getItem('reg_no');

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getterms();
   
  }
  terms()
  {
    let bod={}
    bod['reg_no']=this.regno;
    this._apiService.terms(bod).subscribe(dat=>
    {
      this.dat = dat.data;
      this.getterms();
      this.true1= true;
    })
  }


  getterms()
  {
    let bod={}
    bod['reg_no']=this.regno;
    this._apiService.getterms(bod).subscribe(data=>
    {
      if(data.data.getterms)
      {
        this.data1 = data.data.getterms.confirmation;
        this.data =parseInt(this.data1);
        this.true1 =true;
      }
     
      console.log(this.data);
    })
  }

}
