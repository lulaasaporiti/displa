import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { StockFacturacionComponent } from './stock-facturacion/stock-facturacion.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'StockFacturacion/Alta', component: StockFacturacionComponent},
      {path: 'StockFacturacion/Baja', component: StockFacturacionComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManejoStockRoutingModule { }
