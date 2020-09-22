import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { FacturaRoutingModule } from './factura-routing.module';
import { ClienteSeleccionComponent } from './lente-seleccion/cliente-seleccion.component';

// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ ClienteSeleccionComponent ],
    declarations: [ ClienteSeleccionComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        FacturaRoutingModule,
        LoadingSpinnerModule
    ]
})
export class FacturaModule { }
