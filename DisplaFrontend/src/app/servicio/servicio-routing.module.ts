import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicioListadoComponent } from './servicio-listado/servicio-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { ActualizacionPrecioServicioComponent } from './actualizacion-precio-servicio/actualizacion-precio-servicio.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Servicio/Listado', component: ServicioListadoComponent},
      {path: 'Servicio/ActualizacionPrecio', component: ActualizacionPrecioServicioComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
