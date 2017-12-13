import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css']
})
export class YearPickerComponent implements OnInit {




public years: number[] =[];
public yy : number;

  constructor() { }
    ngOnInit() { 
    this.getYear();

    }  

     getYear(){
        var today = new Date();
        this.yy = today.getFullYear();        
        for(var i = (this.yy-20); i <= this.yy; i++){
        this.years.push(i);}
    }

}
