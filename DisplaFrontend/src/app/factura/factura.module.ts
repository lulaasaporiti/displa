import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { FacturaRoutingModule } from './factura-routing.module';
import { ClienteSeleccionComponent } from './cliente-seleccion/cliente-seleccion.component';
import { FacturaAltaComponent } from './factura-alta/factura-alta.component';
import { MatListModule } from '@angular/material';
import { ProductoLenteComponent } from './factura-producto/producto-lente/producto-lente/producto-lente.component';

// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ ClienteSeleccionComponent, ProductoLenteComponent],
    declarations: [ ClienteSeleccionComponent, FacturaAltaComponent, ProductoLenteComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        MatListModule,
        FacturaRoutingModule,
        LoadingSpinnerModule
    ]
})
export class FacturaModule { }
