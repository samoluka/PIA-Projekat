import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { CompanyPartnersPageComponent } from './components/company-subpages/company-partners-page/company-partners-page.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { NotApprovedPageComponent } from './components/not-approved-page/not-approved-page.component';
import { PasswordChangerComponent } from './components/password-changer/password-changer.component';
import { RegisterCompanyFormComponent } from './components/register-company-form/register-company-form.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterCompanyFormComponent },
  { path: 'passwordChanger', component: PasswordChangerComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'company', component: CompanyPageComponent },
  { path: 'company/partners', component: CompanyPartnersPageComponent },
  { path: 'customer', component: CustomerPageComponent },
  { path: 'customer/info', component: CustomerInfoComponent },
  { path: 'notApproved', component: NotApprovedPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
