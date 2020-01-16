import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoInsumoListadoComponent } from './tipo-insumo-listado/tipo-insumo-listado.component';
import { TipoInsumoRoutingModule } from './tipo-insumo-routing.module';
import { TipoInsumoModificacionComponent } from './tipo-insumo-modificacion/tipo-insumo-modificacion.component';
import { TipoInsumoAltaComponent } from './tipo-insumo-alta/tipo-insumo-alta.component';
import { TipoInsumoBajaComponent } from './tipo-insumo-baja/tipo-insumo-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [TipoInsumoAltaComponent, TipoInsumoBajaComponent, TipoInsumoModificacionComponent],
    declarations: [TipoInsumoListadoComponent, TipoInsumoAltaComponent, TipoInsumoBajaComponent, TipoInsumoModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TipoInsumoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class TipoInsumoModule { }
