import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { MovimientoInternoRoutingModule } from './movimiento-interno-routing.module';
import { MovimientoInternoAltaComponent } from './movimiento-interno-alta/movimiento-interno-alta.component';
import { MovimientoInternoDetalleComponent } from './movimiento-interno-detalle/movimiento-interno-detalle.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [MovimientoInternoAltaComponent, MovimientoInternoDetalleComponent],
    declarations: [MovimientoInternoAltaComponent, MovimientoInternoDetalleComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MovimientoInternoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class MovimientoInternoModule { }
