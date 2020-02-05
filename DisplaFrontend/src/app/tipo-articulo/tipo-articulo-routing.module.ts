import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoArticuloListadoComponent } from './tipo-articulo-listado/tipo-articulo-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'TipoArticulo/Listado', component: TipoArticuloListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoArticuloRoutingModule { }
