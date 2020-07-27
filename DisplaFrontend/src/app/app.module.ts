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
import { HeaderComponent } from './header/header';
import { HomeComponent } from './home/home';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { MovimientoBlockModule } from './movimiento-block/movimiento-block.module';
import { MAT_DATE_LOCALE, MatPaginatorIntl } from '@angular/material';
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
import { ManejoStockModule } from './manejo-stock/manejo-stock.module';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GrillaComponent,
    HomeComponent,
    // FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    LoadingSpinnerModule,
    AccountModule,
    ArticuloVarioModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 2000, //0 is unlimited
      extendedTimeOut: 100, //Time to close after a user hovers over toast
      positionClass: 'toast-bottom-left',
      progressBar: true,
    }), // ToastrModule added
    BancoModule,
    BlockModule,
    CategoriaIVAModule,
    ClienteModule,
    CondicionVentaModule,
    InsumoModule,
    LenteModule,
    LimiteGrillaModule,
    LocalidadModule,
    ManejoStockModule,
    MovimientoBlockModule,
    MovimientoInsumoModule,
    ProveedorModule,
    ProvinciaModule,
    ServicioModule,
    TarjetaCreditoModule,
    TipoArticuloModule,
    TipoBlockModule,
    TipoInsumoModule,
    TipoComprobanteModule,
    TipoServicioModule,
    UbicacionModule,
    UsuarioModule
  ],
  providers: [
    LoggedInGuard,
    AuthorizeRoleGuard,
    httpInterceptorProviders,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntLabelProvider },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
