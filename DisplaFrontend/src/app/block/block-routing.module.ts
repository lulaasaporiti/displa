import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockListadoComponent } from './block-listado/block-listado.component';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';

const routes: Routes = [
  {
    path: '', canActivate: [LoggedInGuard],
    children: [
      {path: 'Block/Listado', component: BlockListadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRoutingModule { }
