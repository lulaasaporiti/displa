import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { CuentaBancariaListadoComponent } from './cuenta-bancaria-listado/cuenta-bancaria-listado.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'CuentaBancaria/Listado', component: CuentaBancariaListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaBancariaRoutingModule { }
