import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { StaffComponent } from './staff/staff.component';
import { UploadAttendanceComponent } from './upload-attendance/upload-attendance.component';
import { MachinesComponent } from './machines/machines.component';
import { MonthrangerComponent } from './monthranger/monthranger.component';
import { RangerComponent } from './ranger/ranger.component';
import { ReportComponent } from './report/report.component';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // { path: 'dashboard/:page', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
    { path: 'ranger', component: RangerComponent, canActivate: [AuthGuard] },
    { path: 'upload_attendance', component: UploadAttendanceComponent, canActivate: [AuthGuard]},
    { path: 'machines', component: MachinesComponent, canActivate: [AuthGuard]},
    { path: 'monthranger', component: MonthrangerComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: "dashboard", pathMatch: "full" },
    { path: '**', redirectTo: 'dashboard', pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);