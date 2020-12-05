import { Component, Inject, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';
import { Sobre } from 'src/app/model/sobre';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-sobre-alta',
  templateUrl: './sobre-alta.component.html',
  styleUrls: ['./sobre-alta.component.css']
})
export class SobreAltaComponent {
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  sobres: Sobre[] = [];
  selectedSobre = new EventEmitter<Sobre[]>();
  idCliente: number;

  constructor(
    public dialogRef: MatDialogRef<SobreAltaComponent>,
    private clienteService: ClienteService,
    private sessionService: SessionService,
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
    return c ? c.Id + ' - ' + c.Optica + ' - ' + c.Responsable : undefined;
  }

  private _filter(Optica: string): Cliente[] {
    const filterValue = Optica.toLowerCase();
    return this.clientes.filter(option => option.Optica.toLowerCase().indexOf(filterValue) === 0);
  }

  setIdCliente(control) {
    if (control.value != null) {
      this.idCliente = control.value.Id;
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

  agregarSobre(){
    let sobre = <Sobre>{};
    sobre.Entregas = 1;
    sobre.Fecha = new Date();
    sobre.IdCliente = this.idCliente;
    sobre.IdUsuario = +this.sessionService.getPayload()['idUser'];
    this.sobres.push(sobre);
  }

  eliminarUltimoSobre() {
    this.sobres.pop();
    this.updateStateSobre();
  }

  sobreSelected() {
    this.updateStateSobre();
  }

  updateStateSobre() {
    //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
    //y el ngOnChanges() lo detecte
    let modelSobre = JSON.parse(JSON.stringify(this.data.modelServicio.SobreServicio));
    this.selectedSobre.emit(modelSobre);
  }

}
