import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { InformacionModificacionComponent } from './cliente-modificacion/informacion-modificacion/informacion-modificacion.component';
import { ClienteAltaComponent } from './cliente-alta/cliente-alta.component';
import { ClienteBajaComponent } from './cliente-baja/cliente-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { PrecioLenteListadoComponent } from './cliente-modificacion/precio-lente-listado/precio-lente-listado.component';
import { PrecioArticuloListadoComponent } from './cliente-modificacion/precio-articulo-listado/precio-articulo-listado.component';
import { FichaComponent } from './cliente-modificacion/ficha/ficha.component';
import { FichaDetalleComponent } from './cliente-detalle/ficha-detalle/ficha-detalle.component';
import { InformacionDetalleComponent } from './cliente-detalle/informacion-detalle/informacion-detalle.component';
import { PrecioArticuloListadoDetalleComponent } from './cliente-detalle/precio-articulo-listado-detalle/precio-articulo-listado-detalle.component';
import { PrecioLenteListadoDetalleComponent } from './cliente-detalle/precio-lente-listado-detalle/precio-lente-listado-detalle.component';
import { PrecioServicioListadoComponent } from './cliente-modificacion/precio-servicio-listado/precio-servicio-listado.component';

@NgModule({
    entryComponents: [ClienteBajaComponent],
    declarations: [ClienteListadoComponent, ClienteAltaComponent, ClienteBajaComponent, InformacionModificacionComponent, InformacionDetalleComponent,
        PrecioLenteListadoComponent, PrecioLenteListadoDetalleComponent ,PrecioArticuloListadoComponent, PrecioArticuloListadoDetalleComponent, 
        FichaComponent, FichaDetalleComponent, PrecioServicioListadoComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ClienteRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ClienteModule { }
