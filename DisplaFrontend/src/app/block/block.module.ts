import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockListadoComponent } from './block-listado/block-listado.component';
import { BlockRoutingModule } from './block-routing.module';
import { BlockModificacionComponent } from './block-modificacion/block-modificacion.component';
import { BlockAltaComponent } from './block-alta/block-alta.component';
import { BlockBajaComponent } from './block-baja/block-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { BusquedaCajaComponent } from './busqueda-caja/busqueda-caja.component';

@NgModule({
    entryComponents: [BlockAltaComponent, BlockBajaComponent, BlockModificacionComponent],
    declarations: [BlockListadoComponent, BlockAltaComponent, BlockBajaComponent, BlockModificacionComponent, BusquedaCajaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        BlockRoutingModule,
        LoadingSpinnerModule
    ]
})
export class BlockModule { }
