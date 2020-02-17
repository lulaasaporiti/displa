import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Localidad } from 'src/app/model/localidad';
import { LocalidadService } from 'src/services/localidad.service';

@Component({
  selector: 'app-cliente-modificacion',
  templateUrl: './cliente-modificacion.component.html',
  styleUrls: ['./cliente-modificacion.component.css']
})
export class ClienteModificacionComponent implements OnInit {
  localidades: Localidad[];


  constructor(
    public dialogRef: MatDialogRef<ClienteModificacionComponent>,
    private localidadService: LocalidadService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.localidadService.getLocalidadesVigentesList().subscribe(r => {
      this.localidades = r;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelCliente.nombre != "" && this.data.modelCliente.nombre != undefined)
      this.dialogRef.close(this.data);
  }
}