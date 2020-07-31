import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastoListadoComponent } from './gasto-listado/gasto-listado.component';
import { GastoRoutingModule } from './gasto-routing.module';
import { GastoModificacionComponent } from './gasto-modificacion/gasto-modificacion.component';
import { GastoAltaComponent } from './gasto-alta/gasto-alta.component';
import { GastoBajaComponent } from './gasto-baja/gasto-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [GastoAltaComponent, GastoBajaComponent, GastoModificacionComponent],
    declarations: [GastoListadoComponent, GastoAltaComponent, GastoBajaComponent, GastoModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        GastoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class GastoModule { }
