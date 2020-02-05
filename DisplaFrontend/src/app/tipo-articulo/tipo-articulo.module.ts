import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoArticuloListadoComponent } from './tipo-articulo-listado/tipo-articulo-listado.component';
import { TipoArticuloRoutingModule } from './tipo-articulo-routing.module';
import { TipoArticuloModificacionComponent } from './tipo-articulo-modificacion/tipo-articulo-modificacion.component';
import { TipoArticuloAltaComponent } from './tipo-articulo-alta/tipo-articulo-alta.component';
import { TipoArticuloBajaComponent } from './tipo-articulo-baja/tipo-articulo-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [TipoArticuloAltaComponent, TipoArticuloBajaComponent, TipoArticuloModificacionComponent],
    declarations: [TipoArticuloListadoComponent, TipoArticuloAltaComponent, TipoArticuloBajaComponent, TipoArticuloModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TipoArticuloRoutingModule,
        LoadingSpinnerModule
    ]
})
export class TipoArticuloModule { }
