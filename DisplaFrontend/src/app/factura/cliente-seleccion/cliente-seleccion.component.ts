import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClienteService } from 'src/services/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-seleccion',
  templateUrl: './cliente-seleccion.component.html',
  styleUrls: ['./cliente-seleccion.component.css']
})
export class ClienteSeleccionComponent implements OnInit {
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  deshabilitarSeleccionar = false;

  constructor(
    public dialogRef: MatDialogRef<ClienteSeleccionComponent>,
    private clienteService: ClienteService,
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

  displayCliente(c?: Cliente): string | undefined {
    return c ? c.Id + ' - ' + c.Optica : undefined;
  }

  private _filter(Optica: string): Cliente[] {
    const filterValue = Optica.toLowerCase();
    return this.clientes.filter(option => option.Optica.toLowerCase().indexOf(filterValue) === 0);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.idCliente != "" && this.data.idCliente != undefined)
      this.dialogRef.close(this.data);
  }

  setIdCliente(control, data) {
    if (control.value != null) {
      if (control.value.Bloqueado == true) {
        this.deshabilitarSeleccionar = true;
      }
      else {
        data.idCliente = control.value.Id;
        this.deshabilitarSeleccionar = false;
      }
    }
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
