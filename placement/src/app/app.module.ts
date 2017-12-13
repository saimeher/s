import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MyDatePickerModule } from 'mydatepicker';
// import { Ng2UploaderModule } from 'ng2-uploader';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from "angular2-datatable";
import { ModalModule } from "ngx-modal";
import { DatatablesPipe } from './app.datafilter.pipe';
import { FileSelectDirective } from 'ng2-file-upload';


import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { routing } from './app.routing';


import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './services/authentication.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './common/header/header.component';
import { SidemenuComponent } from './common/sidemenu/sidemenu.component';
import { RegisterComponent } from './register/register.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { StudentsComponent } from './students/students.component';
import { PlacementComponent } from './placement/placement.component';

import { DateComponent } from './common/date/date.component';
import { TruncatePipe } from './common/truncate.pipe';
import { DataFilterPipe } from './common/data-filter.pipe';
import { RolesassignComponent } from './rolesassign/rolesassign.component';
import { CompaniesComponent } from './companies/companies.component';
import { StdshortlistComponent } from './stdshortlist/stdshortlist.component';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NouisliderComponent } from 'ng2-nouislider';

import { CKEditorModule } from 'ng2-ckeditor';
import { RoundsattdeletionComponent } from './roundsattdeletion/roundsattdeletion.component';
import { StudentdashComponent } from './studentdash/studentdash.component';



declare var require: any;

export function highchartsFactory() {

  var hc = require('highcharts');
  var hcm = require('highcharts/highcharts-more');
  var exp = require('highcharts/modules/drilldown');
  var bm = require('highcharts/modules/exporting');
  var sg = require('highcharts/modules/solid-gauge');
  var hm = require('highcharts/modules/heatmap');

  hcm(hc);
  exp(hc);
  sg(hc);
  hm(hc);
  bm(hc);
  return hc;
}


@NgModule({


  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidemenuComponent,
    RegisterComponent,
    YearPickerComponent,
    PlacementComponent,
    StudentsComponent,
    DateComponent,
    DataFilterPipe,
    TruncatePipe,
    RolesassignComponent,
    CompaniesComponent,
    StdshortlistComponent,
    DatatablesPipe,
    FileSelectDirective,
    // FileUploadModule,
    NouisliderComponent,
    RoundsattdeletionComponent,
    StudentdashComponent,

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MultiselectDropdownModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    routing,
    Ng2SmartTableModule,
    AngularMultiSelectModule,
    MyDatePickerModule,
    // Ng2UploaderModule,
    CustomFormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    ModalModule,
    ChartModule,
    CKEditorModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    ApiService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],


  bootstrap: [AppComponent]

})
export class AppModule { }
