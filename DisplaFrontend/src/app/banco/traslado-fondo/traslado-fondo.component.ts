import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CuentaBancaria } from 'src/app/model/cuentaBancaria';
import { CuentaBancariaService } from 'src/services/cuenta.bancaria.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { TrasladoFondo } from 'src/app/model/trasladoFondo';


@Component({
  selector: 'app-traslado-fondo',
  templateUrl: './traslado-fondo.component.html',
  styleUrls: ['./traslado-fondo.component.css']
})
export class TrasladoFondoComponent {
  modelTraslado = <TrasladoFondo>{};
  banco = null;
  banco2 = null;
  cuentas: CuentaBancaria[];

  cuentasControl = new FormControl();
  filteredCuentas: Observable<CuentaBancaria[]>;


  constructor(
    private cuentaBancariaService: CuentaBancariaService,
    public dialogRef: MatDialogRef<TrasladoFondoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
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

  setIdCuentaBancariaOrigen(control) {
    if (control.value != null) this.modelTraslado.IdCuentaOrigen = control.value.Id;
  }

  setIdCuentaBancariaDestino(control) {
    if (control.value != null) this.modelTraslado.IdCuentaDestino = control.value.Id;
  }

  bancoCuenta(event: MatOptionSelectionChange) {
    this.banco = event.source.value.IdBancoNavigation.Nombre;
  }

  bancoCuentaDestino(event: MatOptionSelectionChange) {
    this.banco2 = event.source.value.IdBancoNavigation.Nombre;
  }

  onEnter(): void {
    if (this.modelTraslado.Monto != undefined)
      this.dialogRef.close(this.modelTraslado);
  }

}
