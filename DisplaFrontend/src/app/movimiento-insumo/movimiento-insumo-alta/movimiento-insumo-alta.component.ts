import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UbicacionService } from 'src/services/ubicacion.service';
import { Ubicacion } from 'src/app/model/Ubicacion';

@Component({
  selector: 'app-movimiento-insumo-alta',
  templateUrl: './movimiento-insumo-alta.component.html',
  styleUrls: ['./movimiento-insumo-alta.component.css']
})
export class MovimientoInsumoAltaComponent {
  ubicaciones: Ubicacion[];

  constructor(
    public dialogRef: MatDialogRef<MovimientoInsumoAltaComponent>,
    private ubicacionService: UbicacionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.ubicacionService.getUbicacionesVigentesList().subscribe(r => {
      this.ubicaciones = r;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
