import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoBlockListadoComponent } from './tipo-block-listado/tipo-block-listado.component';
import { TipoBlockRoutingModule } from './tipo-block-routing.module';
import { TipoBlockModificacionComponent } from './tipo-block-modificacion/tipo-block-modificacion.component';
import { TipoBlockAltaComponent } from './tipo-block-alta/tipo-block-alta.component';
import { TipoBlockBajaComponent } from './tipo-block-baja/tipo-block-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [TipoBlockAltaComponent, TipoBlockBajaComponent, TipoBlockModificacionComponent],
    declarations: [TipoBlockListadoComponent, TipoBlockAltaComponent, TipoBlockBajaComponent, TipoBlockModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TipoBlockRoutingModule,
        LoadingSpinnerModule
    ]
})
export class TipoBlockModule { }
