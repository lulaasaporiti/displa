import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { ComprobanteDetalleComponent } from '../factura/comprobante-detalle/comprobante-detalle.component';
import { NotaDebitoComponent } from './nota-debito-alta/nota-debito-alta.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'NotaDebito/Alta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [52] }, component: NotaDebitoComponent},
      {path: 'NotaDebito/Detalle', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [55, 63, 70] }, component: ComprobanteDetalleComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotaDebitoRoutingModule { }
