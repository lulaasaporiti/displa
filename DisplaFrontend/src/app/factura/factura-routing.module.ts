import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { FacturaAltaComponent } from './factura-alta/factura-alta.component';
import { ComprobanteDetalleComponent } from './comprobante-detalle/comprobante-detalle.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Factura/Alta', component: FacturaAltaComponent},
      {path: 'Factura/Detalle', component: ComprobanteDetalleComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
