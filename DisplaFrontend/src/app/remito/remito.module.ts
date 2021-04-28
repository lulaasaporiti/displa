import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { RemitoRoutingModule } from './remito-routing.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { RemitoDetalleComponent } from './remito-detalle/remito-detalle.component';
import { AnulacionRemitoComponent } from './anulacion-remito/anulacion-remito.component';
import { ConsultaRemitoComponent } from './consulta-remito/consulta-remito.component';

@NgModule({
    entryComponents: [  ],
    declarations: [ RemitoDetalleComponent, AnulacionRemitoComponent, ConsultaRemitoComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        MatListModule,
        MatTreeModule,
        MatButtonToggleModule,
        RemitoRoutingModule,
        LoadingSpinnerModule,
        NgxMatSelectSearchModule
    ]
})
export class RemitoModule { }
