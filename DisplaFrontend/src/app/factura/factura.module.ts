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
import { MatButtonToggleModule } from '@angular/material';
import { ProductoDescuentoComponent } from './factura-producto/producto-descuento/producto-descuento.component';
import { FacturaConfirmarComponent } from './factura-confirmar/factura-confirmar.component';
import { ProductoServicioComponent } from './factura-producto/producto-servicio/producto-servicio.component';
import { ProductoLenteComponent } from './factura-producto/producto-lente/producto-lente.component';
import { SeleccionLenteComponent } from './factura-producto/producto-lente/seleccion-lente/seleccion-lente.component';
import { SeleccionServiciosComponent } from './factura-producto/producto-lente/seleccion-servicios/seleccion-servicios.component';
import { SeleccionRecargosComponent } from './factura-producto/producto-lente/seleccion-recargos/seleccion-recargos.component';
import { FacturaFichaComponent } from './factura-ficha/factura-ficha.component';
import { LenteVentaVirtualComponent } from './factura-producto/producto-lente/lente-venta-virtual/lente-venta-virtual.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ResumenLenteComponent } from './factura-producto/producto-lente/resumen-lente/resumen-lente.component';
import { FacturaDetalleComponent } from './factura-detalle/factura-detalle.component';
import { BusquedaItemFacturadoComponent } from './busqueda-item-facturado/busqueda-item-facturado.component';

// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ ClienteSeleccionComponent, ProductoLenteComponent, ProductoArticuloComponent, ProductoLibreComponent, 
        ProductoDescuentoComponent, FacturaConfirmarComponent, ProductoServicioComponent, FacturaFichaComponent, LenteVentaVirtualComponent, ResumenLenteComponent, BusquedaItemFacturadoComponent ],
    declarations: [ ClienteSeleccionComponent, FacturaAltaComponent, ProductoLenteComponent, SeleccionLenteComponent, 
        ProductoArticuloComponent, ProductoLibreComponent, ProductoDescuentoComponent, FacturaConfirmarComponent, FacturaDetalleComponent,
        ProductoServicioComponent, SeleccionServiciosComponent, SeleccionRecargosComponent, FacturaFichaComponent, LenteVentaVirtualComponent, ResumenLenteComponent, BusquedaItemFacturadoComponent ],
    imports: [
        CommonModule,
        MaterialModule,
        MatListModule,
        MatTreeModule,
        MatButtonToggleModule,
        FacturaRoutingModule,
        LoadingSpinnerModule,
        MatButtonToggleModule,
        NgxMatSelectSearchModule
    ]
})
export class FacturaModule { }
