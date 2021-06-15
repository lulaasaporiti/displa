import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChequeCarteraComponent } from './cheque-cartera/cheque-cartera.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'ChequeCartera/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [124] },component: ChequeCarteraComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeRoutingModule { }
