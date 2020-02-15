import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Cliente/Listado', component: ClienteListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
