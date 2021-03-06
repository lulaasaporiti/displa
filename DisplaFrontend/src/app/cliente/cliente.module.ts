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
import { PrecioServicioListadoDetalleComponent } from './cliente-detalle/precio-servicio-listado-detalle/precio-servicio-listado-detalle.component';
import { ClienteCuentaListadoComponent } from './cliente-cuenta-listado/cliente-cuenta-listado.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FichaAltaComponent } from './cliente-modificacion/ficha/ficha-alta/ficha-alta.component';
import { ClienteBloqueoManualComponent } from './cliente-bloqueo-manual/cliente-bloqueo-manual.component';
import { CuentaPorClienteComponent } from './cuenta-por-cliente/cuenta-por-cliente.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClienteBusquedaLista } from './cliente-busqueda-lista/cliente-busqueda-lista.component';
import { PorcentajeDescuentosComponent } from './porcentaje-descuentos/porcentaje-descuentos.component';


@NgModule({
    entryComponents: [ClienteBajaComponent, FichaAltaComponent, ClienteBloqueoManualComponent, PorcentajeDescuentosComponent],
    declarations: [ClienteListadoComponent, ClienteAltaComponent, ClienteBajaComponent, InformacionModificacionComponent, 
        InformacionDetalleComponent, PorcentajeDescuentosComponent, PrecioLenteListadoComponent, PrecioLenteListadoDetalleComponent,
        PrecioArticuloListadoComponent, PrecioArticuloListadoDetalleComponent, CuentaPorClienteComponent, FichaComponent,
        FichaDetalleComponent, PrecioServicioListadoComponent, PrecioServicioListadoDetalleComponent, ClienteCuentaListadoComponent, 
        FichaAltaComponent, ClienteBloqueoManualComponent, ClienteBusquedaLista],
    imports: [
        CommonModule,
        MaterialModule,
        DragDropModule,
        ClienteRoutingModule,
        LoadingSpinnerModule,
        CKEditorModule
    ]
})
export class ClienteModule { }
