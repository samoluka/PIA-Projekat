import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordChangerComponent } from './components/password-changer/password-changer.component';
import { RegisterCompanyFormComponent } from './components/register-company-form/register-company-form.component';
import { RegisterCustomerFormComponent } from './components/register-customer-form/register-customer-form.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { NotApprovedPageComponent } from './components/not-approved-page/not-approved-page.component';
import { CompanyAdditionalInfoPageComponent } from './components/company-subpages/company-additional-info-page/company-additional-info-page.component';
import { CompanyInfoPageComponent } from './components/company-subpages/company-info-page/company-info-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordChangerComponent,
    AdminPageComponent,
    CompanyPageComponent,
    RegisterCompanyFormComponent,
    RegisterCustomerFormComponent,
    CustomerPageComponent,
    CustomerInfoComponent,
    NotApprovedPageComponent,
    CompanyAdditionalInfoPageComponent,
    CompanyInfoPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
