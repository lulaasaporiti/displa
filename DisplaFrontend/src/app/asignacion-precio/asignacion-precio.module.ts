import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { MaterialModule } from '../material/material.module';
import { AsignacionPrecioClienteRoutingModule } from './asignacion-precio-routing.module';
import { AsignacionPrecioClienteLenteComponent } from './asignacion-precio-lente/asignacion-precio-lente.component';
import { AsignacionPrecioClienteServicioComponent } from './asignacion-precio-servicio/asignacion-precio-servicio.component';
import { AsignacionPrecioClienteArticuloComponent } from './asignacion-precio-articulo/asignacion-precio-articulo.component';

@NgModule({
    // entryComponents: [ ],
    declarations: [ AsignacionPrecioClienteLenteComponent, AsignacionPrecioClienteServicioComponent, AsignacionPrecioClienteArticuloComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        AsignacionPrecioClienteRoutingModule,
        LoadingSpinnerModule
    ]
})
export class AsignacionPrecioClienteModule { }
