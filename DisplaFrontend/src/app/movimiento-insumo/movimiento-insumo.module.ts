import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoInsumoListadoComponent } from './movimiento-insumo-listado/movimiento-insumo-listado.component';
import { MovimientoInsumoRoutingModule } from './movimiento-insumo-routing.module';
import { MovimientoInsumoAltaComponent } from './movimiento-insumo-alta/movimiento-insumo-alta.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [MovimientoInsumoAltaComponent ],
    declarations: [MovimientoInsumoListadoComponent, MovimientoInsumoAltaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MovimientoInsumoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class MovimientoInsumoModule { }
