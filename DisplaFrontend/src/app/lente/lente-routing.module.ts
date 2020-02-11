import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LenteListadoComponent } from './lente-listado/lente-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Lente/Listado', component: LenteListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenteRoutingModule { }
