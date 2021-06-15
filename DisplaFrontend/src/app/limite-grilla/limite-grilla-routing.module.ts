import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimiteGrillaListadoComponent } from './limite-grilla-listado/limite-grilla-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'LimiteGrilla/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [108] }, component: LimiteGrillaListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimiteGrillaRoutingModule { }
