import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicioListadoComponent } from './servicio-listado/servicio-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { ActualizacionPrecioServicioComponent } from './actualizacion-precio-servicio/actualizacion-precio-servicio.component';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Servicio/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [24] }, component: ServicioListadoComponent},
      {path: 'Servicio/ActualizacionPrecio', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [49] }, component: ActualizacionPrecioServicioComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
