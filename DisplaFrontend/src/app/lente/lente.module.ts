import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LenteListadoComponent } from './lente-listado/lente-listado.component';
import { LenteRoutingModule } from './lente-routing.module';
import { LenteModificacionComponent } from './lente-modificacion/lente-modificacion.component';
import { LenteAltaComponent } from './lente-alta/lente-alta.component';
import { LenteBajaComponent } from './lente-baja/lente-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { LenteDetalleComponent } from './lente-detalle/lente-detalle.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [LenteBajaComponent],
    declarations: [LenteListadoComponent, LenteAltaComponent, LenteBajaComponent, LenteModificacionComponent, LenteDetalleComponent],
    imports: [
        CommonModule,
        MaterialModule,
        LenteRoutingModule,
        LoadingSpinnerModule
    ]
})
export class LenteModule { }
