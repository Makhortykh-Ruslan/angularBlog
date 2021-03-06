import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/creat-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicesModule} from './shared/services.module';
import {AuthGuard} from './shared/services/auth.guard';
import {SearchPipe} from './shared/search.pipe';
import {AlertServices} from './shared/services/alert.services';
import {AlertComponent} from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    ServicesModule,
      RouterModule.forChild([
          {
            path: '', component: AdminLayoutComponent, children: [
              {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
              {path: 'login', component: LoginPageComponent},
              {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
              {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
              {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
            ]
          }
      ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertServices],
})
export class AdminModule {

}
