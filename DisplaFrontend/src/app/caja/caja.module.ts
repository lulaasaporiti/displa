import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { MovimientoCajaAltaComponent } from './movimiento-caja-alta/movimiento-caja-alta.component';
import { MovimientoCajaDiariaAltaComponent } from './movimiento-caja-diaria-alta/movimiento-caja-diaria-alta.component';

@NgModule({
    entryComponents: [ MovimientoCajaAltaComponent, MovimientoCajaDiariaAltaComponent ],
    declarations: [ MovimientoCajaAltaComponent, MovimientoCajaDiariaAltaComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        CajaRoutingModule,
        LoadingSpinnerModule
    ]
})
export class CajaModule { }
