import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChequeCarteraComponent } from './cheque-cartera/cheque-cartera.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'ChequeCartera/Listado', component: ChequeCarteraComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeRoutingModule { }
