import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { MaterialModule } from '../material/material.module';
import { AsignacionPrecioClienteRoutingModule } from './asignacion-precio-routing.module';
import { AsignacionPrecioClienteLenteComponent } from './asignacion-precio-lente/asignacion-precio-lente.component';

@NgModule({
    // entryComponents: [ ],
    declarations: [ AsignacionPrecioClienteLenteComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        AsignacionPrecioClienteRoutingModule,
        LoadingSpinnerModule
    ]
})
export class AsignacionPrecioClienteModule { }
