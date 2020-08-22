import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material/material.module';
import { LoadingSpinnerModule } from '../../loading-spinner/loading-spinner.module';
import { GestionPrecioRoutingModule } from './gestion-precio-routing.module';
import { PrecioListaUnoComponent } from './precio-lista-uno/precio-lista-uno.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [PrecioListaUnoComponent],
    declarations: [PrecioListaUnoComponent],
    imports: [
        CommonModule,
        MaterialModule,
        GestionPrecioRoutingModule,
        LoadingSpinnerModule
    ]
})
export class GestionPrecioModule { }
