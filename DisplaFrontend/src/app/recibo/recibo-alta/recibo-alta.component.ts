import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';
import { Recibo } from 'src/app/model/recibo';


@Component({
  selector: 'app-recibo-alta',
  templateUrl: './recibo-alta.component.html',
  styleUrls: ['./recibo-alta.component.css']
})
export class ReciboAltaComponent {
  modelRecibo = <Recibo>{};
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  constructor( 
    public dialogRef: MatDialogRef<ReciboAltaComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
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

  onEnter(): void {
    if (this.data.modelUbicacion.Nombre != "" && this.data.modelUbicacion.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
