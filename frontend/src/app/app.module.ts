import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CompanyPartnersPageComponent } from './components/company-subpages/company-partners-page/company-partners-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatCardModule } from '@angular/material/card'; 
import { NewProductComponent } from './components/company-subpages/new-product/new-product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AllProductsComponent } from './components/company-subpages/all-products/all-products.component';
import { MatPaginatorModule } from '@angular/material/paginator'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    CompanyPartnersPageComponent,
    HomePageComponent,
    NewProductComponent,
    ProductCardComponent,
    AllProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
