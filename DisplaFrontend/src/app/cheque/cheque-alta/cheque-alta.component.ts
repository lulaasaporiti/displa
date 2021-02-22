import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { Banco } from 'src/app/model/Banco';
import { Cliente } from 'src/app/model/cliente';
import { BancoService } from 'src/services/banco.service';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-cheque-alta',
  templateUrl: './cheque-alta.component.html',
  styleUrls: ['./cheque-alta.component.css']
})
export class ChequeAltaComponent {
  bancos: Banco[] = [];
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;


  constructor(
    private bancoService: BancoService,
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<ChequeAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  
  ngOnInit() {
    this.data.modelCheque.Fecha = new Date();
    this.data.modelCheque.FechaAlta = new Date();
    combineLatest([
      this.bancoService.getBancosVigentesList(),
      this.clienteService.getClientesVigentesList()
    ])
      .subscribe(result => {
        this.bancos = result[0];
        this.clientes = result[1];
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

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
