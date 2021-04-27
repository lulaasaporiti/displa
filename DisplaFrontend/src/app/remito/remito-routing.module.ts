import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { RemitoDetalleComponent } from './remito-detalle/remito-detalle.component';
import { AnulacionRemitoComponent } from './anulacion-remito/anulacion-remito.component';


const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Remito/Detalle', component: RemitoDetalleComponent},
      {path: 'Remito/BusquedaAnulados', component: AnulacionRemitoComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemitoRoutingModule { }
