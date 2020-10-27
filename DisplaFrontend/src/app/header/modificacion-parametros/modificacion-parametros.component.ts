import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ServicioService } from 'src/services/servicio.service';
import { ClienteService } from 'src/services/cliente.service';
import { TipoServicioService } from 'src/services/tipo.servicio.service';
import { Parametro } from 'src/app/model/parametro';

@Component({
  selector: 'app-modificacion-parametros',
  templateUrl: './modificacion-parametros.component.html',
  styleUrls: ['./modificacion-parametros.component.css']
})
export class  ModificacionParametrosComponent implements OnInit {
  modelParametros= <Parametro>{};
  @ViewChild('ser', { static: true }) ser;

  
  constructor(
    public dialogRef: MatDialogRef<ModificacionParametrosComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {

  }




  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement) {
    // if (event.code == "Enter") {
    //   event.preventDefault();
    //   if (idElement == 'cantidad0') {
    //     this.ser.close();
    //     this.traerPrecio();
    //   }
    //   if (idElement.startsWith("cantidad")){
    //     if (+idElement.split("cantidad")[1] == this.comprobantesItems.length)
    //       idElement = 'seleccionar';
    //   }
    //   document.getElementById(idElement).focus();
    // }
  }


}