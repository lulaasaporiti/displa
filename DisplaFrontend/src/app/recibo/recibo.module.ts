import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { ReciboAltaComponent } from './recibo-alta/recibo-alta.component';
import { ReciboRoutingModule } from './recibo-routing.module';
import { ReciboDetalleComponent } from './recibo-detalle/recibo-detalle.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ ReciboAltaComponent, ReciboDetalleComponent ],
    declarations: [ ReciboAltaComponent, ReciboDetalleComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        ReciboRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ReciboModule { }
