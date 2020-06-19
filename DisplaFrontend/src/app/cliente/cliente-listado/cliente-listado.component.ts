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
import { CdkAccordion } from '@angular/cdk/accordion';


@Component({
  selector: 'app-cliente-listado',
  templateUrl: './cliente-listado.component.html',
  styleUrls: ['./cliente-listado.component.css']
})
export class ClienteListadoComponent implements OnInit {


  form:FormGroup = new FormGroup({
    Optica: new FormControl(false),
    Nombre: new FormControl(false),
    Domicilio: new FormControl(false),
    Telefonos: new FormControl(false),
    Mail: new FormControl(false),
    UtilizaIibb: new FormControl(false),
    Borrado: new FormControl(false),
    Opciones: new FormControl(false),
  });

  Optica = this.form.get('Optica');
  Nombre = this.form.get('Nombre');
  Domicilio = this.form.get('Domicilio');
  Telefonos = this.form.get('Telefonos');
  Mail = this.form.get('Mail');
  UtilizaIibb = this.form.get('UtilizaIibb');
  Borrado = this.form.get('Borrado');
  Opciones = this.form.get('Opciones');


  cbValues;
  displayedColumns = 
  [
    {def: 'Optica', hide: this.Optica.value},
    {def: 'Nombre', hide: this.Nombre.value},
    {def: 'Domicilio',  hide: this.Domicilio.value},
    {def: 'Telefonos',  hide: this.Telefonos.value},
    {def: 'Mail',  hide: this.Mail.value},
    {def: 'UtilizaIibb',  hide: this.UtilizaIibb.value},
    {def: 'Borrado',  hide: this.Borrado.value},
    {def: 'Opciones',  hide: this.Opciones.value},
  ]
  // displayedColumnsNoCheck= ['Opciones']

  dataSource = new MatTableDataSource<Cliente>();
  traerActivos: boolean = true;

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
  }


  getDisplayedColumns() {
    return this.displayedColumns.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
    let o1:Observable<boolean> = this.Optica.valueChanges;
    let o2:Observable<boolean> = this.Nombre.valueChanges;
    let o3:Observable<boolean> = this.Domicilio.valueChanges;
    let o4:Observable<boolean> = this.Telefonos.valueChanges;
    let o5:Observable<boolean> = this.Mail.valueChanges;
    let o6:Observable<boolean> = this.UtilizaIibb.valueChanges;
    let o7:Observable<boolean> = this.Borrado.valueChanges;
    let o8:Observable<boolean> = this.Opciones.valueChanges;

    merge(o1, o2, o3,o4,o5,o6,o7).subscribe(v=>{
    this.displayedColumns[0].hide = this.Optica.value;
    this.displayedColumns[1].hide = this.Nombre.value;  
    this.displayedColumns[2].hide = this.Domicilio.value;  
    this.displayedColumns[3].hide = this.Telefonos.value;
    this.displayedColumns[4].hide = this.Mail.value; 
    this.displayedColumns[5].hide = this.UtilizaIibb.value;  
    this.displayedColumns[6].hide = this.Borrado.value;
    this.displayedColumns[7].hide = this.Opciones.value;  
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

  eliminarCliente(Cliente: Cliente): void {
    const dialogRef = this.dialog.open(ClienteBajaComponent, {
      data: { modelCliente: Cliente }
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
