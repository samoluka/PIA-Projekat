import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordChangerComponent } from './password-changer/password-changer.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'passwordChanger', component: PasswordChangerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
