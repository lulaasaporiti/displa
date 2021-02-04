import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { SessionService } from 'src/services/session.service';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-venta-cliente-mes',
  templateUrl: './venta-cliente-mes.component.html',
  styleUrls: ['./venta-cliente-mes.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class VentaClienteMesComponent {
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  todo: boolean;
  analogo: boolean;

  since = new FormControl(moment());
  today = new FormControl(moment());



  chosenYearHandler(normalizedYear: Moment, fecha: string) {
    if (fecha == 'desde') {
      const ctrlValue = this.since.value;
      ctrlValue.year(normalizedYear.year());
      this.since.setValue(ctrlValue);
    }
    if (fecha == 'hasta') {
      const ctrlValue = this.today.value;
      ctrlValue.year(normalizedYear.year());
      this.today.setValue(ctrlValue);

    }
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, fecha: string) {
    if (fecha == 'desde') {
      const ctrlValue = this.since.value;
      ctrlValue.month(normalizedMonth.month());
      this.since.setValue(ctrlValue);
      datepicker.close();
    }
    if (fecha == 'hasta') {
      if (this.since.value < this.today.value) {
        const ctrlValue = this.today.value;
        ctrlValue.month(normalizedMonth.month());
        this.today.setValue(ctrlValue);
        datepicker.close();
      }
      else {
        this.sessionService.showWarning("La fecha hasta debe ser mayor a la fecha desde.");
      }
    }
  }

  constructor(
    private clienteService: ClienteService,
    private sessionService: SessionService,
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