import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/component/app/app.component';
import { LoginComponent } from './app/component/auth/login/login.component';
import { SignUpComponent } from './app/component/auth/signup/signup.component';
import { MainComponent } from './app/component/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signUp', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
