import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { ManejoStockRoutingModule } from './manejo-stock-routing.module';
import { ManejoStockAltaComponent } from './manejo-stock-alta/manejo-stock-alta.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ ],
    declarations: [ ManejoStockAltaComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        ManejoStockRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ManejoStockModule { }
