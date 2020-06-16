import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { PrecioLenteClienteService } from 'src/services/precio.lente.cliente.service';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Lente } from 'src/app/model/lente';
import { ClienteService } from 'src/services/cliente.service';
import { PrecioLenteCliente } from 'src/app/model/precioLenteCliente';


@Component({
  selector: 'app-precio-lente-cliente-listado-detalle',
  templateUrl: './precio-lente-listado-detalle.component.html',
  styleUrls: ['./precio-lente-listado-detalle.component.css']
})
export class PrecioLenteListadoDetalleComponent implements OnInit {

  displayedColumns: string[] = ['Nombre'];
  columns = [];
  idCliente: number = 0;

  dataSource = new MatTableDataSource<Lente>();
  preciosSeleccionados: PrecioLenteCliente[] = [];
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private precioLenteClienteService: PrecioLenteClienteService,
    private lenteService: LenteService,
    private segment: ActivatedRoute,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { 
      this.segment.queryParams.subscribe((params: Params) => {
        this.idCliente = +params['idCliente']; // (+) converts string 'id' to a number;
        });
      this.clienteService.getPreciosLentesCliente(this.idCliente).subscribe(r => {
        this.preciosSeleccionados = r;
        console.log(this.preciosSeleccionados)
      })
    }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadPrecioLentePage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  cancelar(){
    this.router.navigateByUrl('Cliente/Listado')
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioLentePage() {
    this.loadingSpinnerService.show()
      this.lenteService.getLentesVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          console.log(this.dataSource.data)
          var maxCantPrecio = 0;
        this.dataSource.data.forEach(a => {
          if (a.PrecioLente.length > maxCantPrecio && a.PrecioLente)
            maxCantPrecio = a.PrecioLente.length
        });
        for (let i = 1; i <= maxCantPrecio; i++) {
          this.checkboxChecked.push(false)
          this.checkboxIndeterminate.push(false);
          this.displayedColumns.push('Precio' + i);
          this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
          if (i == maxCantPrecio) {
            this.displayedColumns.push('PrecioEspecial');
            this.displayedColumns.push('Descuento');
          }
        }
      });
    this.loadingSpinnerService.hide();
  }

  _keyPress(event: any) {
    const pattern = /[0-9,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.IdPrecioLente == idPrecio);
  }

  habilitarDescuento(lente: Lente) {
    return this.preciosSeleccionados.some(p => lente.PrecioLente.some(plente => plente.Id == p.IdPrecioLente));
  }

  valorPrecioEspecial(idLente) {
    let precio = <PrecioLenteCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioLenteNavigation != undefined && p.IdPrecioLenteNavigation.IdLente == idLente && p.Especial == true)[0]
    if (precio != null)
      return precio.IdPrecioLenteNavigation.Precio;
    else
      return "";
  }

  valorDescuento(idLente) {
    let precio = <PrecioLenteCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioLenteNavigation != undefined && p.IdPrecioLenteNavigation.IdLente == idLente && p.Descuento != null)[0]
    if (precio != null)
      return precio.Descuento;
    else
      return "";
  }

}
