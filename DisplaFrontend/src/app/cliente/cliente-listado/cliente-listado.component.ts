import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteAltaComponent } from '../cliente-alta/cliente-alta.component';
import { ClienteBajaComponent } from '../cliente-baja/cliente-baja.component';
import { ClienteModificacionComponent } from '../cliente-modificacion/cliente-modificacion.component';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-cliente-listado',
  templateUrl: './cliente-listado.component.html',
  styleUrls: ['./cliente-listado.component.css']
})
export class ClienteListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'Domicilio', 'Telefonos', 'Mail', 'UtilizaIibb', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Cliente>();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadClientePage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadClientePage() {
    this.loadingSpinnerService.show()
    this.clienteService.getClientesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
  }

  agregarCliente(): void {
    let Cliente = <Cliente>{};
    const dialogRef = this.dialog.open(ClienteAltaComponent, {
      width: '550px',
      data: { modelCliente: Cliente }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        Cliente.IdLocalidad = Cliente.IdLocalidadNavigation.Id;
        Cliente.IdLocalidadNavigation = null;
        console.log(Cliente)

        this.clienteService.saveOrUpdateCliente(Cliente).subscribe(
          data => {
            this.sessionService.showSuccess("El cliente se ha agregado correctamente.");
            this.loadClientePage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El cliente no se agregó.");
          }
        );
      }
    });
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

  modificarCliente(event: any) {
    let ClienteViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(ClienteModificacionComponent, {
      width: '550px',
      data: { modelCliente: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.clienteService.saveOrUpdateCliente(event).subscribe(
          data => {
            this.sessionService.showSuccess("El cliente se ha modificado correctamente");
            this.loadClientePage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El cliente no se modificó.");
          }
        );
      }
    });
  }
}
