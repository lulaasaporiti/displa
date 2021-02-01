import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioListadoComponent } from './usuario-listado/usuario-listado.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioModificacionComponent } from './usuario-modificacion/usuario-modificacion.component';
import { UsuarioAltaComponent } from './usuario-alta/usuario-alta.component';
import { UsuarioBajaComponent } from './usuario-baja/usuario-baja.component';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/core';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [UsuarioAltaComponent, UsuarioModificacionComponent, UsuarioBajaComponent],
    declarations: [UsuarioListadoComponent, UsuarioAltaComponent, UsuarioModificacionComponent, UsuarioBajaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        UsuarioRoutingModule,
        LoadingSpinnerModule,
        BrowserAnimationsModule,
        MatSlideToggleModule
    ]
})
export class UsuarioModule { }
