import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClienteBloqueo } from 'src/app/model/clienteBloqueo';

@Component({
  selector: 'app-cliente-bloqueo-manual',
  templateUrl: './cliente-bloqueo-manual.component.html',
  styleUrls: ['./cliente-bloqueo-manual.component.css']
})
export class ClienteBloqueoManualComponent {
  modelBloqueo= <ClienteBloqueo>{};

  constructor( 
    public dialogRef: MatDialogRef<ClienteBloqueoManualComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.modelBloqueo.IdCliente = data.id;
      if(data.bloqueado == true){
        this.modelBloqueo.Id = 1;
      }
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}