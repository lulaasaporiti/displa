import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoComprobanteListadoComponent } from './tipo-comprobante-listado/tipo-comprobante-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'TipoComprobante/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [119] }, component: TipoComprobanteListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoComprobanteRoutingModule { }
