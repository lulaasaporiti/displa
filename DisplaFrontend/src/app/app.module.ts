import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoadingSpinnerModule } from './loading-spinner/loading-spinner.module';
import { AccountModule } from './account/account.module';
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
import { FooterComponent } from './footer/footer';
import { MovimientoBlockModule } from './movimiento-block/movimiento-block.module';
import { MAT_DATE_LOCALE, MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntLabelProvider } from '../providers/MatPaginatorIntLabel-provider';
import { TipoInsumoModule } from './tipo-insumo/tipo-insumo.module';
import { InsumoModule } from './insumo/insumo.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LoadingSpinnerModule,
    AccountModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 2000, //0 is unlimited
      extendedTimeOut: 100, //Time to close after a user hovers over toast
      positionClass: 'toast-bottom-left',
      progressBar: true,
    }), // ToastrModule added
    UsuarioModule,
    TipoBlockModule,
    TipoInsumoModule,
    BlockModule,
    InsumoModule,
    UbicacionModule,
    MovimientoBlockModule
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
