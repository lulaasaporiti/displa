import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { ComprobanteDetalleComponent } from '../factura/comprobante-detalle/comprobante-detalle.component';
import { NotaCreditoComponent } from './nota-credito-alta/nota-credito-alta.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'NotaCredito/Alta', component: NotaCreditoComponent},
      {path: 'NotaCredito/Detalle', component: ComprobanteDetalleComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotaCreditoRoutingModule { }
