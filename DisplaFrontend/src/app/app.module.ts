import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoadingSpinnerModule } from './loading-spinner/loading-spinner.module';
import { AccountModule } from './account/account.module';
import { ArticuloVarioModule } from './articulo-vario/articulo-vario.module';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioModule } from './usuario/usuario.module';
import { LoggedInGuard } from 'src/guards/loggedIn-guard';
import { AuthorizeRoleGuard } from 'src/guards/authorizeRole-guard';
import { httpInterceptorProviders } from 'src/interceptors';
import { TipoBlockModule } from './tipo-block/tipo-block.module';
import { BlockModule } from './block/block.module';
import { HomeComponent } from './home/home';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { MovimientoBlockModule } from './movimiento-block/movimiento-block.module';
import { MatPaginatorIntLabelProvider } from '../providers/MatPaginatorIntLabel-provider';
import { TipoInsumoModule } from './tipo-insumo/tipo-insumo.module';
import { InsumoModule } from './insumo/insumo.module';
import { MovimientoInsumoModule } from './movimiento-insumo/movimiento-insumo.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { CategoriaIVAModule } from './categoria-iva/categoria-iva.module';
import { CondicionVentaModule } from './condicion-venta/condicion-venta.module';
import { TipoServicioModule } from './tipo-servicio/tipo-servicio.module';
import { TipoArticuloModule } from './tipo-articulo/tipo-articulo.module';
import { ServicioModule } from './servicio/servicio.module';
import { LenteModule } from './lente/lente.module';
import { GrillaComponent } from './lente/grilla/grilla.component';
// import { FooterComponent } from './footer/footer';
import { ClienteModule } from './cliente/cliente.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { LocalidadModule } from './localidad/localidad.module';
import { BancoModule } from './banco/banco.module';
import { TarjetaCreditoModule } from './tarjeta-credito/tarjeta-credito.module';
import { LimiteGrillaModule } from './limite-grilla/limite-grilla.module';
import { TipoComprobanteModule } from './tipo-comprobante/tipo-comprobante.module';
import { ManejoStockModule } from './stock/stock.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GastoModule } from './gasto/gasto.module';
import { GestionPrecioModule } from './header/gestion-precio/gestion-precio.module';
import { AsignacionPrecioClienteModule } from './asignacion-precio/asignacion-precio.module';
import { FacturaModule } from './factura/factura.module';
import { ModificacionParametrosModule } from './header/modificacion-parametros/modificacion-parametros.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SobreModule } from './sobre/sobre.module';
import { VentaVirtualModule } from './venta-virtual/venta-virtual.module';
import { EstadisticaModule } from './estadistica/estadistica.module';
import { NotaCreditoModule } from './nota-credito/nota-credito.module';
import { NotaDebitoModule } from './nota-debito/nota-debito.module';
import { ReciboModule } from './recibo/recibo.module';
import { MovimientoInternoModule } from './movimiento-interno/movimiento-interno.module';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BusquedaItemModule } from './busqueda-item/busqueda-item.module';
import { RemitoModule } from './remito/remito.module';
import { ChequeModule } from './cheque/cheque.module';
import { CuentaBancariaModule } from './cuenta-bancaria/cuenta-bancaria.module';
import { HeaderComponent } from './header/header';
import { CajaModule } from './caja/caja.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ExportacionService } from 'src/services/exportacion.service';
import { TipoDescuentoModule } from './tipo-descuento/tipo-descuento.module';
import { AnulacionConfirmacionComponent } from './anulacion-confirmacion/anulacion-confirmacion.component';
import { ComprobanteProveedorModule } from './comprobante-proveedor/comprobante-proveedor.module';




@NgModule({
  entryComponents: [ AnulacionConfirmacionComponent ],
  declarations: [
    AppComponent,
    HeaderComponent,
    GrillaComponent,
    HomeComponent,
    AnulacionConfirmacionComponent
    // FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    MatTreeModule,
    LoadingSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        closeButton: true,
        timeOut: 2500, //0 is unlimited
        extendedTimeOut: 100, //Time to close after a user hovers over toast
        positionClass: 'toast-bottom-right',
        progressBar: true,
        preventDuplicates: true,
      }), // ToastrModule added
    AccountModule,
    ArticuloVarioModule,
    AsignacionPrecioClienteModule,
    BancoModule,
    BlockModule,
    BusquedaItemModule,
    CajaModule,
    CategoriaIVAModule,
    ChequeModule,
    ClienteModule,
    ComprobanteProveedorModule,
    CondicionVentaModule,
    CuentaBancariaModule,
    EstadisticaModule,
    FacturaModule,
    GastoModule,
    GestionPrecioModule,
    InsumoModule,
    LenteModule,
    LimiteGrillaModule,
    LocalidadModule,
    ManejoStockModule,
    ModificacionParametrosModule,
    MovimientoBlockModule,
    MovimientoInsumoModule,
    MovimientoInternoModule,
    NgxMatSelectSearchModule,
    NotaCreditoModule,
    NotaDebitoModule,
    ProveedorModule,
    ProvinciaModule,
    ReciboModule,
    RemitoModule,
    ServicioModule,
    SobreModule,
    TarjetaCreditoModule,
    TipoArticuloModule,
    TipoBlockModule,
    TipoDescuentoModule,
    TipoInsumoModule,
    TipoComprobanteModule,
    TipoServicioModule,
    UbicacionModule,
    UsuarioModule,
    VentaVirtualModule,
    CKEditorModule 
  ],
  providers: [
    LoggedInGuard,
    AuthorizeRoleGuard,
    ExportacionService,
    httpInterceptorProviders,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntLabelProvider },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
