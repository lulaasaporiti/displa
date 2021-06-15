import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { DetalleArticuloComponent } from './detalle-articulo/detalle-articulo.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Estadistica/DetalleArticulo', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [74] }, component: DetalleArticuloComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticaRoutingModule { }
