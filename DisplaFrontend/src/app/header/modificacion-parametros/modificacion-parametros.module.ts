import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material/material.module';
import { LoadingSpinnerModule } from '../../loading-spinner/loading-spinner.module';
import { ModificacionParametrosComponent } from './modificacion-parametros.component';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ModificacionParametrosComponent],
    declarations: [ModificacionParametrosComponent],
    imports: [
        CommonModule,
        MaterialModule,
        LoadingSpinnerModule
    ]
})
export class ModificacionParametrosModule { }
