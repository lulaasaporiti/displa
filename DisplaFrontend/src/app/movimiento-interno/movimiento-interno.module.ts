import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { MovimientoInternoRoutingModule } from './movimiento-interno-routing.module';
import { MovimientoInternoAltaComponent } from './movimiento-interno-alta/movimiento-interno-alta.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [MovimientoInternoAltaComponent],
    declarations: [MovimientoInternoAltaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MovimientoInternoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class MovimientoInternoModule { }
