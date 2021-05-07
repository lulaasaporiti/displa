import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { ManejoStockRoutingModule } from './stock-routing.module';
import { StockFacturacionComponent } from './stock-facturacion/stock-facturacion.component';

@NgModule({
    entryComponents: [ ],
    declarations: [ StockFacturacionComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        ManejoStockRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ManejoStockModule { }
