import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequeCarteraComponent } from './cheque-cartera/cheque-cartera.component';
import { ChequeRoutingModule } from './cheque-routing.module';
import { ChequeAltaComponent } from './cheque-alta/cheque-alta.component';
import { ChequeBajaComponent } from './cheque-baja/cheque-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ChequeAltaComponent, ChequeBajaComponent ],
    declarations: [ChequeCarteraComponent, ChequeAltaComponent, ChequeBajaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ChequeRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ChequeModule { }
