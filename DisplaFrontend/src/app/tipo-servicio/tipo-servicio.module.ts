import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoServicioListadoComponent } from './tipo-servicio-listado/tipo-servicio-listado.component';
import { TipoServicioRoutingModule } from './tipo-servicio-routing.module';
import { TipoServicioModificacionComponent } from './tipo-servicio-modificacion/tipo-servicio-modificacion.component';
import { TipoServicioAltaComponent } from './tipo-servicio-alta/tipo-servicio-alta.component';
import { TipoServicioBajaComponent } from './tipo-servicio-baja/tipo-servicio-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [TipoServicioAltaComponent, TipoServicioBajaComponent, TipoServicioModificacionComponent],
    declarations: [TipoServicioListadoComponent, TipoServicioAltaComponent, TipoServicioBajaComponent, TipoServicioModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TipoServicioRoutingModule,
        LoadingSpinnerModule
    ]
})
export class TipoServicioModule { }
