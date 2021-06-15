import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { RemitoDetalleComponent } from './remito-detalle/remito-detalle.component';
import { AnulacionRemitoComponent } from './anulacion-remito/anulacion-remito.component';
import { ConsultaRemitoComponent } from './consulta-remito/consulta-remito.component';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';


const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Remito/Detalle', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [55, 61, 62, 63] }, component: RemitoDetalleComponent},
      {path: 'Remito/BusquedaAnulados', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [62] }, component: AnulacionRemitoComponent},
      {path: 'Remito/Consulta', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [61] }, component: ConsultaRemitoComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemitoRoutingModule { }
