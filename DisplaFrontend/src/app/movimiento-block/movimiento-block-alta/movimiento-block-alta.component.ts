import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UbicacionService } from 'src/services/ubicacion.service';
import { Ubicacion } from 'src/app/model/Ubicacion';

@Component({
  selector: 'app-movimiento-block-alta',
  templateUrl: './movimiento-block-alta.component.html',
  styleUrls: ['./movimiento-block-alta.component.css']
})
export class MovimientoBlockAltaComponent {
  ubicaciones: Ubicacion[];

  constructor(
    public dialogRef: MatDialogRef<MovimientoBlockAltaComponent>,
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
