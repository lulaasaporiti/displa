import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondicionVentaListadoComponent } from './condicion-venta-listado/condicion-venta-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'CondicionVenta/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [115] }, component: CondicionVentaListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondicionVentaRoutingModule { }
