import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancoListadoComponent } from './banco-listado/banco-listado.component';
import { BancoRoutingModule } from './banco-routing.module';
import { BancoModificacionComponent } from './banco-modificacion/banco-modificacion.component';
import { BancoAltaComponent } from './banco-alta/banco-alta.component';
import { BancoBajaComponent } from './banco-baja/banco-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { TrasladoFondoComponent } from './traslado-fondo/traslado-fondo.component';
import { MovimientoInternoBancoAltaComponent } from './movimiento-interno-banco-alta/movimiento-interno-banco-alta.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OperacionCuentaBancariaComponent } from './operacion-bancaria/operacion-bancaria.component';

@NgModule({
    entryComponents: [BancoAltaComponent, BancoBajaComponent, BancoModificacionComponent, TrasladoFondoComponent, MovimientoInternoBancoAltaComponent, OperacionCuentaBancariaComponent],
    declarations: [BancoListadoComponent, BancoAltaComponent, BancoBajaComponent, BancoModificacionComponent, TrasladoFondoComponent, MovimientoInternoBancoAltaComponent, OperacionCuentaBancariaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        BancoRoutingModule,
        MatButtonToggleModule,
        LoadingSpinnerModule
    ]
})
export class BancoModule { }
