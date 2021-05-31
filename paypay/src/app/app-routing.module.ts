import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignedReviewComponent } from './assigned-review/assigned-review.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent
  }, {
    path: "employee",
    component: EmployeeComponent
  }, {
    path: "reviews",
    component: ReviewComponent
  }, {
    path: "assigned-review",
    component: AssignedReviewComponent
  }, {
    path: "signin",
    component: SignInComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
