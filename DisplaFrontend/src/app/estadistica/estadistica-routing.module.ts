import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { DetalleArticuloComponent } from './detalle-articulo/detalle-articulo.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Estadistica/DetalleArticulo', component: DetalleArticuloComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticaRoutingModule { }
