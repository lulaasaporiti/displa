import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GastoListadoComponent } from './gasto-listado/gasto-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Gasto/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [78] }, component: GastoListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastoRoutingModule { }
