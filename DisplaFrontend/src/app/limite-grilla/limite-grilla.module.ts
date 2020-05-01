import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimiteGrillaListadoComponent } from './limite-grilla-listado/limite-grilla-listado.component';
import { LimiteGrillaRoutingModule } from './limite-grilla-routing.module';
import { LimiteGrillaModificacionComponent } from './limite-grilla-modificacion/limite-grilla-modificacion.component';
import { LimiteGrillaAltaComponent } from './limite-grilla-alta/limite-grilla-alta.component';
import { LimiteGrillaBajaComponent } from './limite-grilla-baja/limite-grilla-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [LimiteGrillaAltaComponent, LimiteGrillaBajaComponent, LimiteGrillaModificacionComponent],
    declarations: [LimiteGrillaListadoComponent, LimiteGrillaAltaComponent, LimiteGrillaBajaComponent, LimiteGrillaModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        LimiteGrillaRoutingModule,
        LoadingSpinnerModule
    ]
})
export class LimiteGrillaModule { }
