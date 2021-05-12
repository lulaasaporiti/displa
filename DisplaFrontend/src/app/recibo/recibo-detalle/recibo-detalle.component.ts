import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Recibo } from 'src/app/model/recibo';
import { CuentaBancaria } from 'src/app/model/cuentaBancaria';
import { CuentaBancariaService } from 'src/services/cuenta.bancaria.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ParametroService } from 'src/services/parametro.service';
import { ReciboService } from 'src/services/recibo.service';
import { AnulacionConfirmacionComponent } from 'src/app/anulacion-confirmacion/anulacion-confirmacion.component';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-recibo-detalle',
  templateUrl: './recibo-detalle.component.html',
  styleUrls: ['./recibo-detalle.component.css']
})
export class ReciboDetalleComponent {
  modelRecibo = <Recibo>{};
  banco= null;
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  cuentas: CuentaBancaria[];
  cuentasControl = new FormControl();
  filteredCuentas: Observable<CuentaBancaria[]>;

  constructor(
    public dialog: MatDialog,
    private reciboService: ReciboService,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private parametroService: ParametroService,
    public dialogRef: MatDialogRef<ReciboDetalleComponent>,
    private cuentaBancariaService: CuentaBancariaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.reciboService.getById(data.idRecibo).subscribe(r => {
        this.modelRecibo = r;
      })
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    combineLatest([
      this.clienteService.getClientesVigentesList(),
      this.cuentaBancariaService.getCuentaBancariasList(),
    ]).subscribe(r => {
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

  verCheques(){
    let url = `ChequeCartera/Listado`
    window.open(url, '_blank');
  }

  openDialogAnulacion(){
    const dialogRef = this.dialog.open(AnulacionConfirmacionComponent, {
      width: '550px',
      data: { model: this.modelRecibo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.reciboService.saveOrUpdateRecibo(result).subscribe(
          data => {
            this.sessionService.showSuccess("El recibo se ha anulado correctamente.");
            this.dialogRef.close(true);
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El recibo no se anuló.");
          }
        );
      }
      
    });
  }
}
