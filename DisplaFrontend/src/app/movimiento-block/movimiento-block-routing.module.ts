import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimientoBlockListadoComponent } from './movimiento-block-listado/movimiento-block-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'MovimientoBlock/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [26, 27] }, component: MovimientoBlockListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientoBlockRoutingModule { }
