import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TipoInsumo } from 'src/app/model/tipoInsumo';
import { TipoInsumoService } from 'src/services/tipo.insumo.service';

@Component({
  selector: 'app-insumo-modificacion',
  templateUrl: './insumo-modificacion.component.html',
  styleUrls: ['./insumo-modificacion.component.css']
})
export class InsumoModificacionComponent implements OnInit{
  tiposInsumo: TipoInsumo[];

  constructor( 
    public dialogRef: MatDialogRef<InsumoModificacionComponent>,
    private tipoInsumoService: TipoInsumoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
      this.tipoInsumoService.getTiposInsumosList().subscribe(r => {
        this.tiposInsumo = r;
      });
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}