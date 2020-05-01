import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BancoListadoComponent } from './banco-listado/banco-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Banco/Listado', component: BancoListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoRoutingModule { }
