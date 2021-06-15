import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { StockFacturacionComponent } from './stock-facturacion/stock-facturacion.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'StockFacturacion/Alta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [33] }, component: StockFacturacionComponent},
      {path: 'StockFacturacion/Baja', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [34] }, component: StockFacturacionComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManejoStockRoutingModule { }
