import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Localidad } from 'src/app/model/localidad';
import { LocalidadService } from 'src/services/localidad.service';

@Component({
  selector: 'app-proveedor-modificacion',
  templateUrl: './proveedor-modificacion.component.html',
  styleUrls: ['./proveedor-modificacion.component.css']
})
export class ProveedorModificacionComponent implements OnInit {
  localidades: Localidad[];


  constructor(
    public dialogRef: MatDialogRef<ProveedorModificacionComponent>,
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
    if (this.data.modelProveedor.nombre != "" && this.data.modelProveedor.nombre != undefined)
      this.dialogRef.close(this.data);
  }
}