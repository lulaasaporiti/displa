import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';
import { FacturaAltaComponent } from '../factura/factura-alta/factura-alta.component';
import { FacturaProveedorComponent } from './factura/factura.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Proveedor/Factura', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [86] }, component: FacturaProveedorComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprobanteProveedorRoutingModule { }