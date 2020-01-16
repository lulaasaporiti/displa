import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsumoListadoComponent } from './insumo-listado/insumo-listado.component';
import { InsumoRoutingModule } from './insumo-routing.module';
import { InsumoModificacionComponent } from './insumo-modificacion/insumo-modificacion.component';
import { InsumoAltaComponent } from './insumo-alta/insumo-alta.component';
import { InsumoBajaComponent } from './insumo-baja/insumo-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [InsumoAltaComponent, InsumoBajaComponent, InsumoModificacionComponent],
    declarations: [InsumoListadoComponent, InsumoAltaComponent, InsumoBajaComponent, InsumoModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        InsumoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class InsumoModule { }
