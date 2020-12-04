import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-sobre-alta',
  templateUrl: './sobre-alta.component.html',
  styleUrls: ['./sobre-alta.component.css']
})
export class SobreAltaComponent {
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;

  constructor(
    public dialogRef: MatDialogRef<SobreAltaComponent>,
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
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  displayCliente(c?: Cliente): string | undefined {
    return c ? c.Id + ' - ' + c.Optica : undefined;
  }

  private _filter(Optica: string): Cliente[] {
    const filterValue = Optica.toLowerCase();
    return this.clientes.filter(option => option.Optica.toLowerCase().indexOf(filterValue) === 0);
  }

  setIdCliente(control, data) {
    if (control.value != null) {

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
