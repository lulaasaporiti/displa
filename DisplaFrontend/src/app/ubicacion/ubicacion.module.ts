import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionListadoComponent } from './ubicacion-listado/ubicacion-listado.component';
import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { UbicacionModificacionComponent } from './ubicacion-modificacion/ubicacion-modificacion.component';
import { UbicacionAltaComponent } from './ubicacion-alta/ubicacion-alta.component';
import { UbicacionBajaComponent } from './ubicacion-baja/ubicacion-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [UbicacionAltaComponent, UbicacionBajaComponent, UbicacionModificacionComponent],
    declarations: [UbicacionListadoComponent, UbicacionAltaComponent, UbicacionBajaComponent, UbicacionModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        UbicacionRoutingModule,
        LoadingSpinnerModule
    ]
})
export class UbicacionModule { }
