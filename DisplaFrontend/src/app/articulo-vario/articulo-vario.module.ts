import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticuloVarioListadoComponent } from './articulo-vario-listado/articulo-vario-listado.component';
import { ArticuloVarioRoutingModule } from './articulo-vario-routing.module';
import { ArticuloVarioModificacionComponent } from './articulo-vario-modificacion/articulo-vario-modificacion.component';
import { ArticuloVarioAltaComponent } from './articulo-vario-alta/articulo-vario-alta.component';
import { ArticuloVarioBajaComponent } from './articulo-vario-baja/articulo-vario-baja.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { ActualizacionPrecioArticuloComponent } from './actualizacion-precio-articulo/actualizacion-precio-articulo.component';
import { ModificacionPrecioArticuloVarioComponent } from './modificacion-precio-articulo-vario/modificacion-precio-articulo-vario.component';

@NgModule({
    entryComponents: [ArticuloVarioBajaComponent, ModificacionPrecioArticuloVarioComponent],
    declarations: [ArticuloVarioListadoComponent, ArticuloVarioAltaComponent, ArticuloVarioBajaComponent, ArticuloVarioModificacionComponent, 
        ActualizacionPrecioArticuloComponent, ModificacionPrecioArticuloVarioComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ArticuloVarioRoutingModule,
        LoadingSpinnerModule
    ]
})
export class ArticuloVarioModule { }
