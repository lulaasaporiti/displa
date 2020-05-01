import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancoListadoComponent } from './banco-listado/banco-listado.component';
import { BancoRoutingModule } from './banco-routing.module';
import { BancoModificacionComponent } from './banco-modificacion/banco-modificacion.component';
import { BancoAltaComponent } from './banco-alta/banco-alta.component';
import { BancoBajaComponent } from './banco-baja/banco-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [BancoAltaComponent, BancoBajaComponent, BancoModificacionComponent],
    declarations: [BancoListadoComponent, BancoAltaComponent, BancoBajaComponent, BancoModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        BancoRoutingModule,
        LoadingSpinnerModule
    ]
})
export class BancoModule { }
