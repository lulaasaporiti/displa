import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoComprobanteListadoComponent } from './tipo-comprobante-listado/tipo-comprobante-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'TipoComprobante/Listado', component: TipoComprobanteListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoComprobanteRoutingModule { }
