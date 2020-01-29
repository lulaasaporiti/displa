import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProveedorListadoComponent } from './proveedor-listado/proveedor-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Proveedor/Listado', component: ProveedorListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
