import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AsignacionPrecioClienteLenteComponent } from './asignacion-precio-lente/asignacion-precio-lente.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'AsignacionPrecioLente/Listado', component: AsignacionPrecioClienteLenteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionPrecioClienteRoutingModule { }
