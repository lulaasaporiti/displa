import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LenteListadoComponent } from './lente-listado/lente-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { LenteAltaComponent } from './lente-alta/lente-alta.component';
import { LenteModificacionComponent } from './lente-modificacion/lente-modificacion.component';
import { LenteDetalleComponent } from './lente-detalle/lente-detalle.component';
import { GrillaComponent } from './grilla/grilla.component';
import { ActualizacionPrecioLenteComponent } from './actualizacion-precio-lente/actualizacion-precio-lente.component';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Lente/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [17] }, component: LenteListadoComponent},
      {path: 'Lente/Alta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [17] }, component: LenteAltaComponent},
      {path: 'Lente/Modificacion', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [17] }, component: LenteModificacionComponent},
      {path: 'Lente/Detalle', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [17] }, component: LenteDetalleComponent},
      {path: 'Lente/Stock', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [17] }, component: GrillaComponent},
      {path: 'Lente/ActualizacionPrecio', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [45] }, component: ActualizacionPrecioLenteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenteRoutingModule { }
