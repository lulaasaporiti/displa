import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteListadoComponent } from './cliente-listado/cliente-listado.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteModificacionComponent } from './cliente-modificacion/cliente-modificacion.component';
import { ClienteAltaComponent } from './cliente-alta/cliente-alta.component';
import { ClienteBajaComponent } from './cliente-baja/cliente-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ClienteAltaComponent, ClienteBajaComponent, ClienteModificacionComponent],
    declarations: [ClienteListadoComponent, ClienteAltaComponent, ClienteBajaComponent, ClienteModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ClienteRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ClienteModule { }
