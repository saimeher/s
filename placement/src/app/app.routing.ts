import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { StudentsComponent } from './students/students.component';
import { PlacementComponent } from './placement/placement.component';
import { RolesassignComponent } from './rolesassign/rolesassign.component';
import { CompaniesComponent } from './companies/companies.component';
import { StdshortlistComponent } from './stdshortlist/stdshortlist.component';
import { RoundsattdeletionComponent } from './roundsattdeletion/roundsattdeletion.component';
import { StudentdashComponent } from 'app/studentdash/studentdash.component';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path:'studentdash', component: StudentdashComponent,canActivate: [AuthGuard]},
    // { path: 'dashboard/:page', component: DashboardComponent, canActivate: [AuthGuard] },
    // { path: 'financecounter', component: FinancecounterComponent, canActivate: [AuthGuard] },
    // { path: 'feestructure', component: FeestructureComponent, canActivate: [AuthGuard] },
    // { path: 'seatallotment', component: SeatallotmentComponent, canActivate: [AuthGuard] },
    { path: 'roundsattdeletion', component: RoundsattdeletionComponent, canActivate: [AuthGuard] },
    { path: 'stdshortlist', component: StdshortlistComponent, canActivate: [AuthGuard] },
    { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard] },
    { path: 'rolesassign', component: RolesassignComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
    { path: 'placement', component: PlacementComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: "dashboard", pathMatch: "full" },
    { path: '**', redirectTo: 'dashboard', pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);