import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';
import { FacturaProveedorComponent } from './factura/factura.component';
import { NotaCreditoProveedorComponent } from './nota-credito/nota-credito.component';
import { NotaDebitoProveedorComponent } from './nota-debito/nota-debito.component';
import { ConsultaComprobanteProveedorComponent } from './consulta-comprobante/consulta-comprobante.component';
import { ReciboProveedorComponent } from './recibo/recibo.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Proveedor/ConsultaComprobante', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [81] }, component: ConsultaComprobanteProveedorComponent},
      {path: 'Proveedor/Factura', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [86] }, component: FacturaProveedorComponent},
      {path: 'Proveedor/NotaDebito', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [87] }, component: NotaDebitoProveedorComponent},
      {path: 'Proveedor/NotaCredito', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [88] }, component: NotaCreditoProveedorComponent},
      {path: 'Proveedor/Recibo', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [89] }, component: ReciboProveedorComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprobanteProveedorRoutingModule { }