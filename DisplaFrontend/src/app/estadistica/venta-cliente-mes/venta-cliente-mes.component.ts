import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';
import { Moment } from 'moment';

@Component({
  selector: 'app-venta-cliente-mes',
  templateUrl: './venta-cliente-mes.component.html',
  styleUrls: ['./venta-cliente-mes.component.css']
})
export class VentaClienteMesComponent {
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  today = new Date();
  since: Date;
  todo: boolean;
  analogo: boolean;

  constructor(
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<VentaClienteMesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.clienteService.getClientesVigentesList()
      .subscribe(r => {
        this.clientes = r;
        this.filteredClientes = this.clientesControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterCliente(val))
          );
      });
  }

  handleYearSelected(normalizedYear: Moment) {
    console.log("normalizedYear: ", normalizedYear.toDate());
  }
  handleMonthSelected(normalizedMonth: Moment) {
    console.log("normalizedMonth: ", normalizedMonth.toDate());
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  setIdCliente(control, data) {
    if (control.value != null) {
      // if (control.value.Bloqueado == true) {
      //   this.deshabilitarSeleccionar = true;
      // }
      // else {
      //   data.idCliente = control.value.Id;
      //   this.deshabilitarSeleccionar = false;
      // }
    }
  }

  displayCliente(c?: Cliente): string | undefined {
    return c ? c.Id + ' - ' + c.Optica : undefined;
  }

  clientesSeleccionados(event: MatOptionSelectionChange) {

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

}