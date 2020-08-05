import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloVarioListadoComponent } from './articulo-vario-listado/articulo-vario-listado.component';
import { LoggedInGuard } from '../../guards/loggedIn-guard';
import { ArticuloVarioAltaComponent } from './articulo-vario-alta/articulo-vario-alta.component';
import { ArticuloVarioModificacionComponent } from './articulo-vario-modificacion/articulo-vario-modificacion.component';
import { ActualizacionPrecioArticuloComponent } from './actualizacion-precio-articulo/actualizacion-precio-articulo.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'ArticuloVario/Listado', component: ArticuloVarioListadoComponent},
      {path: 'ArticuloVario/Alta', component: ArticuloVarioAltaComponent},
      {path: 'ArticuloVario/Modificacion', component: ArticuloVarioModificacionComponent},
      {path: 'ArticuloVario/Modificacion', component: ArticuloVarioModificacionComponent},
      {path: 'ArticuloVario/ActualizacionPrecio', component: ActualizacionPrecioArticuloComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloVarioRoutingModule { }
