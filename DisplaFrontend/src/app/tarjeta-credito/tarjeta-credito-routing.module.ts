import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarjetaCreditoListadoComponent } from './tarjeta-credito-listado/tarjeta-credito-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'TarjetaCredito/Listado', component: TarjetaCreditoListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaCreditoRoutingModule { }
