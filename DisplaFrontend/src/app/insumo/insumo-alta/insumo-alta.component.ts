import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoInsumoService } from 'src/services/tipo.insumo.service';
import { TipoInsumo } from 'src/app/model/tipoInsumo';

@Component({
  selector: 'app-insumo-alta',
  templateUrl: './insumo-alta.component.html',
  styleUrls: ['./insumo-alta.component.css']
})
export class InsumoAltaComponent implements OnInit {
  tiposInsumo: TipoInsumo[];

  constructor(
    public dialogRef: MatDialogRef<InsumoAltaComponent>,
    private tipoInsumoService: TipoInsumoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.tipoInsumoService.getTiposInsumosVigentesList().subscribe(r => {
      this.tiposInsumo = r;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
