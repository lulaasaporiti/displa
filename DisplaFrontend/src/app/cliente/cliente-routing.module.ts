import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { ClienteAltaComponent } from './cliente-alta/cliente-alta.component';
import { ClienteModificacionComponent } from './cliente-modificacion/cliente-modificacion.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Cliente/Listado', component: ClienteListadoComponent},
      {path: 'Cliente/Alta', component: ClienteAltaComponent},
      {path: 'Cliente/Modificacion', component: ClienteModificacionComponent},
      // {path: 'Cliente/Detalle', component: ClienteDetalleComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
