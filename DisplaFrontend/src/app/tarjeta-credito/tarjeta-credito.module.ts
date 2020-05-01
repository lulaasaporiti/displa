import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetaCreditoListadoComponent } from './tarjeta-credito-listado/tarjeta-credito-listado.component';
import { TarjetaCreditoRoutingModule } from './tarjeta-credito-routing.module';
import { TarjetaCreditoModificacionComponent } from './tarjeta-credito-modificacion/tarjeta-credito-modificacion.component';
import { TarjetaCreditoAltaComponent } from './tarjeta-credito-alta/tarjeta-credito-alta.component';
import { TarjetaCreditoBajaComponent } from './tarjeta-credito-baja/tarjeta-credito-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [TarjetaCreditoAltaComponent, TarjetaCreditoBajaComponent, TarjetaCreditoModificacionComponent],
    declarations: [TarjetaCreditoListadoComponent, TarjetaCreditoAltaComponent, TarjetaCreditoBajaComponent, TarjetaCreditoModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TarjetaCreditoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class TarjetaCreditoModule { }
