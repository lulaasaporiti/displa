import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LenteListadoComponent } from './lente-listado/lente-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { LenteAltaComponent } from './lente-alta/lente-alta.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Lente/Listado', component: LenteListadoComponent},
      {path: 'Lente/Alta', component: LenteAltaComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenteRoutingModule { }
