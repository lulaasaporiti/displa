import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LenteListadoComponent } from './lente-listado/lente-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { LenteAltaComponent } from './lente-alta/lente-alta.component';
import { LenteModificacionComponent } from './lente-modificacion/lente-modificacion.component';
import { LenteDetalleComponent } from './lente-detalle/lente-detalle.component';
import { GrillaComponent } from './grilla/grilla.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Lente/Listado', component: LenteListadoComponent},
      {path: 'Lente/Alta', component: LenteAltaComponent},
      {path: 'Lente/Modificacion', component: LenteModificacionComponent},
      {path: 'Lente/Detalle', component: LenteDetalleComponent},
      {path: 'Lente/Stock', component: GrillaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenteRoutingModule { }
