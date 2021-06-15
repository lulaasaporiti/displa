import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { FacturaAltaComponent } from './factura-alta/factura-alta.component';
import { ComprobanteDetalleComponent } from './comprobante-detalle/comprobante-detalle.component';
import { AnulacionComprobanteComponent } from './anulacion-comprobante/anulacion-comprobante.component';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      { path: 'Factura/Alta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [86] }, component: FacturaAltaComponent },
      { path: 'Factura/Detalle', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [55, 63, 64, 70] }, component: ComprobanteDetalleComponent },
      { path: 'Comprobante/BusquedaAnulados', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [63] }, component: AnulacionComprobanteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
