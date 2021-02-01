import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/core';


@Component({
  selector: 'app-usuario-baja',
  templateUrl: './usuario-baja.component.html',
  styleUrls: ['./usuario-baja.component.css']
})
export class UsuarioBajaComponent {
  
  constructor(
    public dialogRef: MatDialogRef<UsuarioBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  
      console.log(data)
    }

    onNoClick(): void {        
        this.dialogRef.close(false);
    }
}
