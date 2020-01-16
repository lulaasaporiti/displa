import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoBlockListadoComponent } from './movimiento-block-listado/movimiento-block-listado.component';
import { MovimientoBlockRoutingModule } from './movimiento-block-routing.module';
import { MovimientoBlockAltaComponent } from './movimiento-block-alta/movimiento-block-alta.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [MovimientoBlockAltaComponent ],
    declarations: [MovimientoBlockListadoComponent, MovimientoBlockAltaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MovimientoBlockRoutingModule,
        LoadingSpinnerModule
    ]
})
export class MovimientoBlockModule { }
