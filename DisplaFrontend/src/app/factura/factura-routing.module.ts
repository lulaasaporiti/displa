import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { FacturaAltaComponent } from './factura-alta/factura-alta.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Factura/Alta', component: FacturaAltaComponent},
      // {path: 'Lente/Modificacion', component: LenteModificacionComponent},
      // {path: 'Lente/Detalle', component: LenteDetalleComponent},
      // {path: 'Lente/Stock', component: GrillaComponent},
      // {path: 'Lente/ActualizacionPrecio', component: ActualizacionPrecioLenteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
