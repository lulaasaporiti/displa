import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorListadoComponent } from './proveedor-listado/proveedor-listado.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorModificacionComponent } from './proveedor-modificacion/proveedor-modificacion.component';
import { ProveedorAltaComponent } from './proveedor-alta/proveedor-alta.component';
import { ProveedorBajaComponent } from './proveedor-baja/proveedor-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ProveedorAltaComponent, ProveedorBajaComponent, ProveedorModificacionComponent],
    declarations: [ProveedorListadoComponent, ProveedorAltaComponent, ProveedorBajaComponent, ProveedorModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ProveedorRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ProveedorModule { }
