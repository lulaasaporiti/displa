import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Recibo } from 'src/app/model/recibo';
import { CuentaBancaria } from 'src/app/model/cuentaBancaria';
import { CuentaBancariaService } from 'src/services/cuenta.bancaria.service';


@Component({
  selector: 'app-recibo-alta',
  templateUrl: './recibo-alta.component.html',
  styleUrls: ['./recibo-alta.component.css']
})
export class ReciboAltaComponent {
  modelRecibo = <Recibo>{};
  banco= null;
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  cuentas: CuentaBancaria[];
  cuentasControl = new FormControl();
  filteredCuentas: Observable<CuentaBancaria[]>;

  constructor(
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<ReciboAltaComponent>,
    private cuentaBancariaService: CuentaBancariaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    combineLatest(
      this.clienteService.getClientesVigentesList(),
      this.cuentaBancariaService.getCuentaBancariasList(),
    )
      .subscribe(r => {
        this.clientes = r[0];
        this.filteredClientes = this.clientesControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterCliente(val))
          );
        this.cuentas = r[1];
        this.filteredCuentas = this.cuentasControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterCuentas(val))
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

  setIdCliente(control) {
    if (control.value != null) this.modelRecibo.IdCliente = control.value.Id;
  }

  displayCuentas(c?: CuentaBancaria): string | undefined {
    return c ? c.Numero : undefined;
  }

  filterCuentas(nombre: any): CuentaBancaria[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.cuentas.filter(cuenta =>
        cuenta.Id.toString().indexOf(s) !== -1 || cuenta.Numero.toString().toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  setIdCuentaBancaria(control) {
    if (control.value != null) this.modelRecibo.IdCuentaBancaria = control.value.Id;
  }

  bancoCuenta(event: MatOptionSelectionChange){
    this.banco = event.source.value.IdBancoNavigation.Nombre;
  }

  onEnter(): void {
    if (this.data.modelUbicacion.MontoEfectivo != undefined)
      this.dialogRef.close(this.data);
  }

}
