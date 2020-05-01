import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalidadListadoComponent } from './localidad-listado/localidad-listado.component';
import { LocalidadRoutingModule } from './localidad-routing.module';
import { LocalidadModificacionComponent } from './localidad-modificacion/localidad-modificacion.component';
import { LocalidadAltaComponent } from './localidad-alta/localidad-alta.component';
import { LocalidadBajaComponent } from './localidad-baja/localidad-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [LocalidadAltaComponent, LocalidadBajaComponent, LocalidadModificacionComponent],
    declarations: [LocalidadListadoComponent, LocalidadAltaComponent, LocalidadBajaComponent, LocalidadModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        LocalidadRoutingModule,
        LoadingSpinnerModule
    ]
})
export class LocalidadModule { }
