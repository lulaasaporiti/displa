import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDescuentoListadoComponent } from './tipo-descuento-listado/tipo-descuento-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'TipoDescuento/Listado', component: TipoDescuentoListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDescuentoRoutingModule { }
