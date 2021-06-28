import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { NotaCreditoComponent } from './nota-credito-alta/nota-credito-alta.component';
import { NotaCreditoConfirmarComponent } from './nota-credito-confirmar/nota-credito-confirmar.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NotaCreditoRoutingModule } from './nota-credito-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';

// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [  NotaCreditoConfirmarComponent ],
    declarations: [  NotaCreditoComponent,  NotaCreditoConfirmarComponent,
        ],
    imports: [
        CommonModule,
        MaterialModule,
        MatListModule,
        MatTreeModule,
        NotaCreditoRoutingModule,
        LoadingSpinnerModule,
        NgxMatSelectSearchModule
    ]
})
export class NotaCreditoModule { }
