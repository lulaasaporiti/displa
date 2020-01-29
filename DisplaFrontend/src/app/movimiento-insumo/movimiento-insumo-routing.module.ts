import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimientoInsumoListadoComponent } from './movimiento-insumo-listado/movimiento-insumo-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'MovimientoInsumo/Listado', component: MovimientoInsumoListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientoInsumoRoutingModule { }
