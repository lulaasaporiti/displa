import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaIVAListadoComponent } from './categoria-iva-listado/categoria-iva-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'CategoriaIVA/Listado', canActivate: [AuthorizeRoleGuard], data: { expectedRoles: [114] }, component: CategoriaIVAListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaIVARoutingModule { }
