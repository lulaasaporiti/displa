import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { MovimientoInterno } from 'src/app/model/movimientoInterno';
import { TipoComprobanteService } from 'src/services/tipo.comprobante.service';
import { TipoComprobante } from 'src/app/model/tipoComprobante';
import { Proveedor } from 'src/app/model/Proveedor';
import { ProveedorService } from 'src/services/proveedor.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-movimiento-interno-alta',
  templateUrl: './movimiento-interno-alta.component.html',
  styleUrls: ['./movimiento-interno-alta.component.css']
})
export class MovimientoInternoAltaComponent {
  modelMovimientoInterno = <MovimientoInterno>{};
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  proveedores: Proveedor[];
  proveedoresControl = new FormControl();
  filteredProveedores: Observable<Proveedor[]>;
  tipoComprobante: TipoComprobante[];
  deshabilitarSeleccionar = false;

  constructor(
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private proveedorService: ProveedorService,
    public dialogRef: MatDialogRef<MovimientoInternoAltaComponent>,
    private tipoComprobanteService: TipoComprobanteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    combineLatest([
      this.clienteService.getClientesVigentesList(),
      this.tipoComprobanteService.getTiposComprobantesList(),
      this.proveedorService.getProveedoresVigentesList(),
    ])
      .subscribe(r => {
        this.clientes = r[0];
        this.modelMovimientoInterno.IdUsuario = +this.sessionService.getPayload()['idUser'];
        this.filteredClientes = this.clientesControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterCliente(val))
          );
        this.tipoComprobante = r[1].filter(t => t.Id >= 4);
        this.proveedores = r[2];
        this.filteredProveedores = this.proveedoresControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterProveedor(val))
          );
      });
  }

  displayCliente(c?: Cliente): string | undefined {
    return c ? c.Id + ' - ' + c.Optica + ' - ' + c.Responsable : undefined;
  }

  filterCliente(nombre: any): Cliente[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.clientes.filter(cliente =>
        cliente.Id.toString().indexOf(s) !== -1 || cliente.Optica.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  setIdProveedor(control) {
    if (control.value != null) this.modelMovimientoInterno.IdProveedor = control.value.Id;
  }

  displayProvedor(p?: Proveedor): string | undefined {
    return p ? p.Id + ' - ' + p.Nombre : undefined;
  }

  filterProveedor(nombre: any): Proveedor[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.proveedores.filter(proveedor =>
        proveedor.Id.toString().indexOf(s) !== -1 || proveedor.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  setIdCliente(control) {
    // if (control.value != null) this.modelMovimientoInterno.IdCliente = control.value.Id;

    if (control.value != null) {
      if (control.value.Bloqueado == true) {
        this.deshabilitarSeleccionar = true;
      }
      else {
        this.modelMovimientoInterno.IdCliente = control.value.Id;
        this.deshabilitarSeleccionar = false;
      }
    }
  }


  onEnter(): void {
    if (this.data.modelUbicacion.MontoEfectivo != undefined)
      this.dialogRef.close(this.data);
  }

}
