import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { NotaDebitoComponent } from './nota-debito-alta/nota-debito-alta.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NotaDebitoRoutingModule } from './nota-debito-routing.module';
import { NotaDebitoConfirmarComponent } from './nota-debito-confirmar/nota-debito-confirmar.component';
import { MatButtonToggleModule, MatListModule, MatTreeModule } from '@angular/material';

// import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    entryComponents: [ NotaDebitoConfirmarComponent],
    declarations: [  NotaDebitoComponent, NotaDebitoConfirmarComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MatListModule,
        MatTreeModule,
        NotaDebitoRoutingModule,
        LoadingSpinnerModule,
        MatButtonToggleModule,
        NgxMatSelectSearchModule
    ]
})
export class NotaDebitoModule { }
