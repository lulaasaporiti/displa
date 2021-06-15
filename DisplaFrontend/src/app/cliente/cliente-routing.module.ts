import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { ClienteAltaComponent } from './cliente-alta/cliente-alta.component';
import { InformacionModificacionComponent } from './cliente-modificacion/informacion-modificacion/informacion-modificacion.component';
import { InformacionDetalleComponent } from './cliente-detalle/informacion-detalle/informacion-detalle.component';
import { ClienteCuentaListadoComponent } from './cliente-cuenta-listado/cliente-cuenta-listado.component';
import { CuentaPorClienteComponent } from './cuenta-por-cliente/cuenta-por-cliente.component';
import { ClienteBusquedaLista } from './cliente-busqueda-lista/cliente-busqueda-lista.component';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';



const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Cliente/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [72] }, component: ClienteListadoComponent},
      {path: 'Cuentas/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [71] }, component: ClienteCuentaListadoComponent},
      {path: 'Cliente/Alta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [72] }, component: ClienteAltaComponent},
      {path: 'Cliente/Modificacion', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [72] }, component: InformacionModificacionComponent},
      {path: 'Cliente/Detalle', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [72] }, component: InformacionDetalleComponent},
      {path: 'Cliente/Cuenta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [70] }, component: CuentaPorClienteComponent},
      {path: 'Cliente/BusquedaLista', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [69] }, component: ClienteBusquedaLista}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
