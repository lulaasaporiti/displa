import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BusquedaItemComprobanteComponent } from './busqueda-item-facturado/busqueda-item-comprobante.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { BusquedaItemRoutingModule } from './busqueda-item-routing.module';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';


@NgModule({
    entryComponents: [BusquedaItemComprobanteComponent ],
    declarations: [ BusquedaItemComprobanteComponent, ResultadoBusquedaComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        MatListModule,
        MatTreeModule,
        BusquedaItemRoutingModule,
        LoadingSpinnerModule,
        NgxMatSelectSearchModule
    ]
})
export class BusquedaItemModule { }
