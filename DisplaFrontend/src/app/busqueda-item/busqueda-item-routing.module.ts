import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'ResultadoBusqueda/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [55] }, component: ResultadoBusquedaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusquedaItemRoutingModule { }
