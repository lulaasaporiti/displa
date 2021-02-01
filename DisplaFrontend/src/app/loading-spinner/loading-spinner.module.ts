import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material/core';
import { LoadingSpinnerService } from './loading-spinner.service';

@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatProgressBarModule,
    MatProgressSpinnerModule,
    LoadingSpinnerComponent,
  ],
  providers: [
    LoadingSpinnerService
  ]
})
export class LoadingSpinnerModule { }
