import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { ComprobanteDetalleComponent } from '../factura/comprobante-detalle/comprobante-detalle.component';
import { NotaCreditoComponent } from './nota-credito-alta/nota-credito-alta.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'NotaCredito/Alta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [51] }, component: NotaCreditoComponent},
      {path: 'NotaCredito/Detalle', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [55, 63, 70] }, component: ComprobanteDetalleComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotaCreditoRoutingModule { }
