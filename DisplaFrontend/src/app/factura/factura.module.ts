import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { FacturaRoutingModule } from './factura-routing.module';
import { ClienteSeleccionComponent } from './cliente-seleccion/cliente-seleccion.component';
import { FacturaAltaComponent } from './factura-alta/factura-alta.component';
import { MatListModule, MatTreeModule } from '@angular/material';
import { ProductoArticuloComponent } from './factura-producto/producto-articulo/producto-articulo.component';
import { ProductoLibreComponent } from './factura-producto/producto-libre/producto-libre.component';
// import { ProductoServicioComponent } from './factura-producto/producto-servicio/producto-servicio.component';
import { MatButtonToggleModule } from '@angular/material';
import { ProductoDescuentoComponent } from './factura-producto/producto-descuento/producto-descuento.component';
import { ProductoTotalesComponent } from './factura-producto/producto-totales/producto-totales.component';
import { ProductoServicioComponent } from './factura-producto/producto-servicio/producto-servicio.component';
import { ProductoLenteComponent } from './factura-producto/producto-lente/producto-lente.component';
import { SeleccionLenteComponent } from './factura-producto/producto-lente/seleccion-lente/seleccion-lente.component';
import { SeleccionServiciosComponent } from './factura-producto/producto-lente/seleccion-servicios/seleccion-servicios.component';
import { SeleccionRecargosComponent } from './factura-producto/producto-lente/seleccion-recargos/seleccion-recargos.component';

// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ ClienteSeleccionComponent, ProductoLenteComponent, ProductoArticuloComponent, ProductoLibreComponent, 
        ProductoDescuentoComponent, ProductoTotalesComponent, ProductoServicioComponent ],
    declarations: [ ClienteSeleccionComponent, FacturaAltaComponent, ProductoLenteComponent, SeleccionLenteComponent, 
        ProductoArticuloComponent, ProductoLibreComponent, ProductoDescuentoComponent, ProductoTotalesComponent, 
        ProductoServicioComponent, SeleccionServiciosComponent, SeleccionRecargosComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        MatListModule,
        MatTreeModule,
        FacturaRoutingModule,
        LoadingSpinnerModule,
        MatButtonToggleModule
    ]
})
export class FacturaModule { }
