import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CondicionVentaListadoComponent } from './condicion-venta-listado/condicion-venta-listado.component';
import { CondicionVentaRoutingModule } from './condicion-venta-routing.module';
import { CondicionVentaModificacionComponent } from './condicion-venta-modificacion/condicion-venta-modificacion.component';
import { CondicionVentaAltaComponent } from './condicion-venta-alta/condicion-venta-alta.component';
import { CondicionVentaBajaComponent } from './condicion-venta-baja/condicion-venta-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [CondicionVentaAltaComponent, CondicionVentaBajaComponent, CondicionVentaModificacionComponent],
    declarations: [CondicionVentaListadoComponent, CondicionVentaAltaComponent, CondicionVentaBajaComponent, CondicionVentaModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        CondicionVentaRoutingModule,
        LoadingSpinnerModule
    ]
})
export class CondicionVentaModule { }
