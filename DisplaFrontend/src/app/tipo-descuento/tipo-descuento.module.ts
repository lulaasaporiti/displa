import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDescuentoListadoComponent } from './tipo-descuento-listado/tipo-descuento-listado.component';
import { TipoDescuentoRoutingModule } from './tipo-descuento-routing.module';
import { TipoDescuentoModificacionComponent } from './tipo-descuento-modificacion/tipo-descuento-modificacion.component';
import { TipoDescuentoAltaComponent } from './tipo-descuento-alta/tipo-descuento-alta.component';
import { TipoDescuentoBajaComponent } from './tipo-descuento-baja/tipo-descuento-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [TipoDescuentoAltaComponent, TipoDescuentoBajaComponent, TipoDescuentoModificacionComponent],
    declarations: [TipoDescuentoListadoComponent, TipoDescuentoAltaComponent, TipoDescuentoBajaComponent, TipoDescuentoModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TipoDescuentoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class TipoDescuentoModule { }
