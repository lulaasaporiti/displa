import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsumoListadoComponent } from './insumo-listado/insumo-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Insumo/Listado', component: InsumoListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsumoRoutingModule { }
