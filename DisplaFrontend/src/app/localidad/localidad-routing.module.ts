import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalidadListadoComponent } from './localidad-listado/localidad-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Localidad/Listado', component: LocalidadListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalidadRoutingModule { }
