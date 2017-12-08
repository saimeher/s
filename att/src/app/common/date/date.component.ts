import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AppSettings } from '../../app.settings';
declare var $;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  daySelected;
  selDate;
  @Output() dateChange:EventEmitter<any> = new EventEmitter();

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    
      // $(function () {
        $('.sandbox-container input.dob').datepicker({
            autoclose: true,
            todayHighlight: true
        }).on('changeDate', selected => {
          this.daySelected = selected.date;
          this.selDate = (this.daySelected.getFullYear() + '-' +
                (('0' + (this.daySelected.getMonth() + 1)).slice(-2)) + '-' +
                (('0' + this.daySelected.getDate()).slice(-2)));
          this.dateChange.emit(this.selDate);
          console.log(this.selDate);
        });   
        // console.log('test');     
      // }); 
      // this.dateChange.emit();
  }

}
