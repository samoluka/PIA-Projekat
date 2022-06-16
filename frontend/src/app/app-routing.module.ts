import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordChangerComponent } from './components/password-changer/password-changer.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'passwordChanger', component: PasswordChangerComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'company', component: CompanyPageComponent },
  { path: 'customer', component: CustomerPageComponent },
  { path: 'customer/info', component: CustomerInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
