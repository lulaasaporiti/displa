import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoBlockListadoComponent } from './tipo-block-listado/tipo-block-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'TipoBlock/Listado', component: TipoBlockListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoBlockRoutingModule { }
