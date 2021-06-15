import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoInsumoListadoComponent } from './tipo-insumo-listado/tipo-insumo-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'TipoInsumo/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [111] }, component: TipoInsumoListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoInsumoRoutingModule { }
