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
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-listado',
  templateUrl: './cliente-listado.component.html',
  styleUrls: ['./cliente-listado.component.css']
})
export class ClienteListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Optica', 'Domicilio', 'Telefonos', 'Mail', 'UtilizaIibb', 'Borrado', 'Opciones'];
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

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
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
