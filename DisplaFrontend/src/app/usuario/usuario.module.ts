import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioListadoComponent } from './usuario-listado/usuario-listado.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioModificacionComponent } from './usuario-modificacion/usuario-modificacion.component';
import { UsuarioAltaComponent } from './usuario-alta/usuario-alta.component';
import { UsuarioBajaComponent } from './usuario-baja/usuario-baja.component';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioFuncionesComponent } from './usuario-funcionalidades/usuario-funcionalidades.component';
@NgModule({
    entryComponents: [UsuarioAltaComponent, UsuarioModificacionComponent, UsuarioBajaComponent, UsuarioFuncionesComponent],
    declarations: [UsuarioListadoComponent, UsuarioAltaComponent, UsuarioModificacionComponent, UsuarioBajaComponent, UsuarioFuncionesComponent],
    imports: [
        CommonModule,
        MaterialModule,
        UsuarioRoutingModule,
        LoadingSpinnerModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatSelectModule
    ]
})
export class UsuarioModule { }
