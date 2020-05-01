import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinciaListadoComponent } from './provincia-listado/provincia-listado.component';
import { ProvinciaRoutingModule } from './provincia-routing.module';
import { ProvinciaModificacionComponent } from './provincia-modificacion/provincia-modificacion.component';
import { ProvinciaAltaComponent } from './provincia-alta/provincia-alta.component';
import { ProvinciaBajaComponent } from './provincia-baja/provincia-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ProvinciaAltaComponent, ProvinciaBajaComponent, ProvinciaModificacionComponent],
    declarations: [ProvinciaListadoComponent, ProvinciaAltaComponent, ProvinciaBajaComponent, ProvinciaModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ProvinciaRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ProvinciaModule { }
