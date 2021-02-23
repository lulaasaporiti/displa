import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { MovimientoInternoBancoRoutingModule } from './movimiento-interno-banco-routing.module';
import { MovimientoInternoBancoAltaComponent } from './movimiento-interno-banco-alta/movimiento-interno-banco-alta.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [MovimientoInternoBancoAltaComponent],
    declarations: [MovimientoInternoBancoAltaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MatButtonToggleModule,
        MovimientoInternoBancoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class MovimientoInternoBancoModule { }
