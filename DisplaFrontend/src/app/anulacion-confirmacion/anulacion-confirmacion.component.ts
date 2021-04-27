import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-anulacion-confirmacion',
  templateUrl: './anulacion-confirmacion.component.html',
  styleUrls: ['./anulacion-confirmacion.component.css']
})
export class AnulacionConfirmacionComponent {

  constructor( 
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<AnulacionConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      data.model.MotivoAnulado = ''
    }

  onYesClick(): void {
    this.data.model.FechaAnulado = new Date()
    this.data.model.IdUsuarioAnulacion = +this.sessionService.getPayload()['idUser'];
    this.dialogRef.close(this.data.model)
  }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}