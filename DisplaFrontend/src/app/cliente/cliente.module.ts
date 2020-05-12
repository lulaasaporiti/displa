import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteModificacionComponent } from './cliente-modificacion/cliente-modificacion.component';
import { ClienteAltaComponent } from './cliente-alta/cliente-alta.component';
import { ClienteBajaComponent } from './cliente-baja/cliente-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { PrecioLenteListadoComponent } from './precio-lente-listado/precio-lente-listado.component';
import { PrecioArticuloListadoComponent } from './precio-articulo-listado/precio-articulo-listado.component';
import { FichaComponent } from './ficha/ficha.component';

@NgModule({
    entryComponents: [ClienteBajaComponent],
    declarations: [ClienteListadoComponent, ClienteAltaComponent, ClienteBajaComponent, ClienteModificacionComponent, 
        PrecioLenteListadoComponent, PrecioArticuloListadoComponent, FichaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ClienteRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ClienteModule { }
