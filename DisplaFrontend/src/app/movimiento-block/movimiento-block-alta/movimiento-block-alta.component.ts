import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      console.log(data)
  }

  ngOnInit() {
    this.ubicacionService.getUbicacionesVigentesList().subscribe(r => {
      this.ubicaciones = r;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
