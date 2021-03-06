import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AsignacionPrecioClienteLenteComponent } from './asignacion-precio-lente/asignacion-precio-lente.component';
import { AsignacionPrecioClienteServicioComponent } from './asignacion-precio-servicio/asignacion-precio-servicio.component';
import { AsignacionPrecioClienteArticuloComponent } from './asignacion-precio-articulo/asignacion-precio-articulo.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'AsignacionPrecioLente/Listado', component: AsignacionPrecioClienteLenteComponent},
      {path: 'AsignacionPrecioServicio/Listado', component: AsignacionPrecioClienteServicioComponent},
      {path: 'AsignacionPrecioArticulo/Listado', component: AsignacionPrecioClienteArticuloComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionPrecioClienteRoutingModule { }
