import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { VentaVirtualListadoComponent } from './venta-virtual-listado/venta-virtual-listado.component';


const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'VentaVirtual/Listado', component: VentaVirtualListadoComponent,}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaVirtualRoutingModule { }
