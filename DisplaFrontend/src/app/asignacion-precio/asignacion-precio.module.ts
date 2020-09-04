import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { MaterialModule } from '../material/material.module';
import { AsignacionPrecioClienteRoutingModule } from './asignacion-precio-routing.module';
import { AsignacionPrecioClienteLenteComponent } from './asignacion-precio-lente/asignacion-precio-lente.component';
import { AsignacionPrecioClienteServicioComponent } from './asignacion-precio-servicio/asignacion-precio-servicio.component';

@NgModule({
    // entryComponents: [ ],
    declarations: [ AsignacionPrecioClienteLenteComponent, AsignacionPrecioClienteServicioComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        AsignacionPrecioClienteRoutingModule,
        LoadingSpinnerModule
    ]
})
export class AsignacionPrecioClienteModule { }
