import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloVarioListadoComponent } from './articulo-vario-listado/articulo-vario-listado.component';
import { LoggedInGuard } from '../../guards/loggedIn-guard';
import { ArticuloVarioAltaComponent } from './articulo-vario-alta/articulo-vario-alta.component';
import { ArticuloVarioModificacionComponent } from './articulo-vario-modificacion/articulo-vario-modificacion.component';
import { ActualizacionPrecioArticuloComponent } from './actualizacion-precio-articulo/actualizacion-precio-articulo.component';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'ArticuloVario/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [22] }, component: ArticuloVarioListadoComponent},
      {path: 'ArticuloVario/Alta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [22] }, component: ArticuloVarioAltaComponent},
      {path: 'ArticuloVario/Modificacion', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [22] }, component: ArticuloVarioModificacionComponent},
      {path: 'ArticuloVario/ActualizacionPrecio', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [47] }, component: ActualizacionPrecioArticuloComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloVarioRoutingModule { }
