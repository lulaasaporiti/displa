import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { SobreConsultaComponent } from './sobre-consulta/sobre-consulta.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Sobre/Consulta', component: SobreConsultaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SobreRoutingModule { }
