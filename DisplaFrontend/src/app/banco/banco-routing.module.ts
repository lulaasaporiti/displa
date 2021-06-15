import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BancoListadoComponent } from './banco-listado/banco-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Banco/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [121] }, component: BancoListadoComponent}, //121
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoRoutingModule { }
