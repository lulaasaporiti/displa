import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { PrecioArticuloCliente } from 'src/app/model/precioArticuloCliente';
import { PrecioLenteCliente } from 'src/app/model/precioLenteCliente';
import { PrecioServicioCliente } from 'src/app/model/precioServicioCliente';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-porcentaje-descuentos',
  templateUrl: './porcentaje-descuentos.component.html',
  styleUrls: ['./porcentaje-descuentos.component.css']
})
export class PorcentajeDescuentosComponent {
  especialL = false;
  especialA = false;
  especialS = false;
  descuentoL = false;
  descuentoA = false;
  descuentoS = false;
  descuentoC = false;
  excluir0 = true;
  excluirPorcentaje = false;

  dataSourceEspecialLentes = new MatTableDataSource<PrecioLenteCliente>();
  dataSourceEspecialArticulos = new MatTableDataSource<PrecioArticuloCliente>();
  dataSourceEspecialServicios = new MatTableDataSource<PrecioServicioCliente>();
  dataSourceDescuentoLentes = new MatTableDataSource<any>();
  dataSourceDescuentoArticulos = new MatTableDataSource<any>();
  dataSourceDescuentoServicios = new MatTableDataSource<any>();
  dataSourceDescuentoClientes = new MatTableDataSource<any>();


  constructor(
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<PorcentajeDescuentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      combineLatest([
        clienteService.getPreciosEspecialesLentes(),
        clienteService.getPreciosEspecialesArticulos(),
        clienteService.getPreciosEspecialesServicios()
      ]).subscribe(r => {
        console.log(r)
        this.dataSourceEspecialLentes = r[0];
        this.dataSourceEspecialArticulos = r[1];
        this.dataSourceEspecialServicios = r[2];
      })
  }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}