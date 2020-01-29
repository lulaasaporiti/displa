import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LocalidadService } from 'src/services/localidad.service';
import { Localidad } from 'src/app/model/localidad';

@Component({
  selector: 'app-proveedor-alta',
  templateUrl: './proveedor-alta.component.html',
  styleUrls: ['./proveedor-alta.component.css']
})
export class ProveedorAltaComponent implements OnInit {
  localidades: Localidad[];


  constructor(
    public dialogRef: MatDialogRef<ProveedorAltaComponent>,
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
