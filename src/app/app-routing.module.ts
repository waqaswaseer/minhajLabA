import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { AvailibeTestsComponent } from './availibe-tests/availibe-tests.component';
import { BookLabTestComponent } from './book-lab-test/book-lab-test.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent},
  //{ path: 'tests', component: AvailibeTestsComponent,canActivate:[AuthGuard]},
  {path: 'Booklabtest', component: BookLabTestComponent,canActivate:[AuthGuard]},
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: SigninComponent},
  { path : '', redirectTo:'home', pathMatch : 'full'},
  { path: '', component:SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
