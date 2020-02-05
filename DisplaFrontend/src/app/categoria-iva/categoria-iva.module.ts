import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaIVAListadoComponent } from './categoria-iva-listado/categoria-iva-listado.component';
import { CategoriaIVARoutingModule } from './categoria-iva-routing.module';
import { CategoriaIVAModificacionComponent } from './categoria-iva-modificacion/categoria-iva-modificacion.component';
import { CategoriaIVAAltaComponent } from './categoria-iva-alta/categoria-iva-alta.component';
import { CategoriaIVABajaComponent } from './categoria-iva-baja/categoria-iva-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [CategoriaIVAAltaComponent, CategoriaIVABajaComponent, CategoriaIVAModificacionComponent],
    declarations: [CategoriaIVAListadoComponent, CategoriaIVAAltaComponent, CategoriaIVABajaComponent, CategoriaIVAModificacionComponent],
    imports: [
        CommonModule,
        MaterialModule,
        CategoriaIVARoutingModule,
        LoadingSpinnerModule
    ]
})
export class CategoriaIVAModule { }
