import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoServicioListadoComponent } from './tipo-servicio-listado/tipo-servicio-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'TipoServicio/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [110] }, component: TipoServicioListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoServicioRoutingModule { }
