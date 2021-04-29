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



const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Cliente/Listado', component: ClienteListadoComponent},
      {path: 'Cuentas/Listado', component: ClienteCuentaListadoComponent},
      {path: 'Cliente/Alta', component: ClienteAltaComponent},
      {path: 'Cliente/Modificacion', component: InformacionModificacionComponent},
      {path: 'Cliente/Detalle', component: InformacionDetalleComponent},
      {path: 'Cliente/Cuenta', component: CuentaPorClienteComponent},
      {path: 'Cliente/BusquedaLista', component: ClienteBusquedaLista}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
