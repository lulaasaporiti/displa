import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { HomeComponent } from './home/home';

const routes: Routes = [
//   {path: '', // <--  represents the default path for the application, the place to go when the path in the URL is empty, as it typically is at the start.
//   // redirectTo: '/Home',
//   redirectTo: 'Account/Login',
//   pathMatch: 'full',
//   canActivate: [LoggedInGuard],
// },
// { path: 'Home', component: HomeComponent },

{ path: '', redirectTo: 'Account/Login', pathMatch: 'full' },
{
  path: 'Home',
  canActivate: [LoggedInGuard],
  component: HomeComponent
},
// { 
//   path: '**' ,
//   redirectTo: '/Account/Login',
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
