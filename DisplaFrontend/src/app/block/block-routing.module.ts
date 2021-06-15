import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockListadoComponent } from './block-listado/block-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { BusquedaCajaComponent } from './busqueda-caja/busqueda-caja.component';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Block/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [26] }, component: BlockListadoComponent},
      {path: 'Busqueda/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [27] }, component: BusquedaCajaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRoutingModule { }
