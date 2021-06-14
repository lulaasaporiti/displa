import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListadoComponent } from './usuario-listado/usuario-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';


const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard, AuthorizeRoleGuard],
    data: {
      expectedRoles: [11]
    },
    children: [
      {path: 'Usuario/Listado', component: UsuarioListadoComponent,}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
