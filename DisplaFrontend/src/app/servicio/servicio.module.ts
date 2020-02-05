import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioListadoComponent } from './servicio-listado/servicio-listado.component';
import { ServicioRoutingModule } from './servicio-routing.module';
import { ServicioModificacionComponent } from './servicio-modificacion/servicio-modificacion.component';
import { ServicioAltaComponent } from './servicio-alta/servicio-alta.component';
import { ServicioBajaComponent } from './servicio-baja/servicio-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ServicioAltaComponent, ServicioBajaComponent, ServicioModificacionComponent],
    declarations: [ServicioListadoComponent, ServicioAltaComponent, ServicioBajaComponent, ServicioModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ServicioRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ServicioModule { }
