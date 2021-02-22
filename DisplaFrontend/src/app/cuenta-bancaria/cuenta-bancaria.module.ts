import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { CuentaBancariaListadoComponent } from './cuenta-bancaria-listado/cuenta-bancaria-listado.component';
import { CuentaBancariaRoutingModule } from './cuenta-bancaria-routing.module';
import { CuentaBancariaBajaComponent } from './cuenta-bancaria-baja/cuenta-bancaria-baja.component';
import { CuentaBancariaAltaComponent } from './cuenta-bancaria-alta/cuenta-bancaria-alta.component';
import { CuentaBancariaModificacionComponent } from './cuenta-bancaria-modificacion/cuenta-bancaria-modificacion.component';

@NgModule({
    entryComponents: [CuentaBancariaBajaComponent, CuentaBancariaAltaComponent, CuentaBancariaModificacionComponent],
    declarations: [CuentaBancariaListadoComponent, CuentaBancariaBajaComponent, CuentaBancariaAltaComponent, CuentaBancariaModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule, 
        CuentaBancariaRoutingModule,
        LoadingSpinnerModule
    ]
})
export class CuentaBancariaModule { }
