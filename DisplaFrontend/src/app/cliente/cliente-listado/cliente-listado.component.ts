import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteBajaComponent } from '../cliente-baja/cliente-baja.component';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ClienteBloqueoManualComponent } from '../cliente-bloqueo-manual/cliente-bloqueo-manual.component';


@Component({
  selector: 'app-cliente-listado',
  templateUrl: './cliente-listado.component.html',
  styleUrls: ['./cliente-listado.component.css']
})
export class ClienteListadoComponent implements OnInit {

  form:FormGroup = new FormGroup({
    Codigo: new FormControl(true),
    Optica: new FormControl(true),
    Responsable: new FormControl(false),
    Domicilio: new FormControl(true),
    Telefonos: new FormControl(true),
    Mail: new FormControl(false),
    UtilizaIibb: new FormControl(false),
    Borrado: new FormControl(false),
    Bloqueado: new FormControl(false),
    Opciones: new FormControl(true),
  });

  Codigo = this.form.get('Codigo')
  Optica = this.form.get('Optica');
  Responsable = this.form.get('Responsable');
  Domicilio = this.form.get('Domicilio');
  Telefonos = this.form.get('Telefonos');
  Mail = this.form.get('Mail');
  UtilizaIibb = this.form.get('UtilizaIibb');
  Borrado = this.form.get('Borrado');
  Bloqueado = this.form.get('Bloqueado');
  Opciones = this.form.get('Opciones');


  cbValues;
  displayedColumns = 
  [
    {def: 'Codigo', hide: this.Codigo.value},
    {def: 'Optica', hide: this.Optica.value},
    {def: 'Responsable', hide: this.Responsable.value},
    {def: 'Domicilio',  hide: this.Domicilio.value},
    {def: 'Telefonos',  hide: this.Telefonos.value},
    {def: 'Mail',  hide: this.Mail.value},
    {def: 'UtilizaIibb',  hide: this.UtilizaIibb.value},
    {def: 'Borrado',  hide: this.Borrado.value},
    {def: 'Bloqueado',  hide: this.Bloqueado.value},
    {def: 'Opciones', hide: this.Opciones.value},
  ]

  dataSource = new MatTableDataSource<Cliente>();
  traerActivos: boolean = true;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadClientePage()
    this.clienteService.getBloquearClientes().subscribe(resultBloquear => {
      console.log(resultBloquear)
    })
  }

  getDisplayedColumns() {
    return this.displayedColumns.filter(cd=>cd.hide).map(cd=>cd.def);
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
    let o1:Observable<boolean> = this.Codigo.valueChanges;
    let o2:Observable<boolean> = this.Optica.valueChanges;
    let o3:Observable<boolean> = this.Responsable.valueChanges;
    let o4:Observable<boolean> = this.Domicilio.valueChanges;
    let o5:Observable<boolean> = this.Telefonos.valueChanges;
    let o6:Observable<boolean> = this.Mail.valueChanges;
    let o7:Observable<boolean> = this.UtilizaIibb.valueChanges;
    let o8:Observable<boolean> = this.Borrado.valueChanges;
    let o9:Observable<boolean> = this.Bloqueado.valueChanges;
    let o10:Observable<boolean> = this.Opciones.valueChanges;

    merge(o1, o2, o3,o4,o5,o6,o7, o8, o9).subscribe(v=>{
    this.displayedColumns[0].hide = this.Codigo.value;
    this.displayedColumns[1].hide = this.Optica.value;
    this.displayedColumns[2].hide = this.Responsable.value;  
    this.displayedColumns[3].hide = this.Domicilio.value;  
    this.displayedColumns[4].hide = this.Telefonos.value;
    this.displayedColumns[5].hide = this.Mail.value; 
    this.displayedColumns[6].hide = this.UtilizaIibb.value;  
    this.displayedColumns[7].hide = this.Borrado.value;
    this.displayedColumns[8].hide = this.Bloqueado.value;
    this.displayedColumns[9];  
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerActivos = !this.traerActivos;
    this.loadClientePage();
  }
  

  loadClientePage() {
    this.loadingSpinnerService.show()
    if (this.traerActivos == true) {
      this.clienteService.getClientesActivosList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.clienteService.getClientesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  eliminarCliente(idCliente, optica, borrado): void {
    const dialogRef = this.dialog.open(ClienteBajaComponent, {
      data: {  id: idCliente, optica: optica,  borrado: borrado }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.clienteService.deleteCliente(result).subscribe(
          data => {
            this.loadClientePage()
            this.sessionService.showSuccess("El cliente se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El cliente no se borró.");
          }
        );
      }
    })
  }

  bloquearCliente(idCliente, optica, bloqueado): void {
    const dialogRef = this.dialog.open(ClienteBloqueoManualComponent, {
      data: { id: idCliente, optica: optica,  bloqueado: bloqueado },
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.clienteService.saveClienteBloqueo(result).subscribe(
          data => {
            this.loadClientePage()
            this.sessionService.showSuccess("El cliente se ha bloqueado/desbloqueado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El cliente no se bloqueo/desbloqueo.");
          }
        );
      }
    })
  }


  agregarCliente(): void {
    this.router.navigateByUrl('/Cliente/Alta')
  }

  modificarCliente(id: number) {
    this.router.navigateByUrl('Cliente/Modificacion?id=' + id);
  }

  detalleCliente(id: number) {
    this.router.navigateByUrl('Cliente/Detalle?id=' + id);
  }
}
