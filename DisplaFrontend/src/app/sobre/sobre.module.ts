import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { SobreAltaComponent } from './sobre-alta/sobre-alta.component';
import { SobreConsultaComponent } from './sobre-consulta/sobre-consulta.component';
import { SobreRoutingModule } from './sobre-routing.module';
// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [SobreAltaComponent],
    declarations: [SobreConsultaComponent, SobreAltaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        SobreRoutingModule,
        LoadingSpinnerModule
    ]
})
export class SobreModule { }
