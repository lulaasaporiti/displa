import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloVarioListadoComponent } from './articulo-vario-listado/articulo-vario-listado.component';
import { LoggedInGuard } from '../../guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'ArticuloVario/Listado', component: ArticuloVarioListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloVarioRoutingModule { }
