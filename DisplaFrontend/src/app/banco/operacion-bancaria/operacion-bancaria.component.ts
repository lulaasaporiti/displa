import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { OperacionBancaria } from 'src/app/model/operacionBancaria';
import { CuentaBancaria } from 'src/app/model/cuentaBancaria';
import { CuentaBancariaService } from 'src/services/cuenta.bancaria.service';
import { MatOptionSelectionChange } from '@angular/material/core';


@Component({
  selector: 'app-operacion-bancaria',
  templateUrl: './operacion-bancaria.component.html',
  styleUrls: ['./operacion-bancaria.component.css']
})
export class OperacionCuentaBancariaComponent {
  modelOperacion = <OperacionBancaria>{};
  banco = null;
  cuentas: CuentaBancaria[];

  cuentasControl = new FormControl();
  filteredCuentas: Observable<CuentaBancaria[]>;


  constructor(
    private cuentaBancariaService: CuentaBancariaService,
    public dialogRef: MatDialogRef<OperacionCuentaBancariaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    this.modelOperacion.Fecha = new Date();
    this.modelOperacion.Entrada = true;
    this.modelOperacion.DepositaCheque = false;
    this.modelOperacion.EmiteCheque = false;
    this.cuentaBancariaService.getCuentaBancariasVigentesList()
      .subscribe(r => {
        this.cuentas = r;
        this.filteredCuentas = this.cuentasControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterCuentas(val))
          );
      });
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
    if (control.value != null) this.modelOperacion.IdCuentaBancaria = control.value.Id;
  }

  bancoCuenta(event: MatOptionSelectionChange) {
    this.banco = event.source.value.IdBancoNavigation.Nombre;
  }

  onEnter(): void {
    if (this.modelOperacion.Monto != undefined)
      this.dialogRef.close(this.modelOperacion);
  }

}
