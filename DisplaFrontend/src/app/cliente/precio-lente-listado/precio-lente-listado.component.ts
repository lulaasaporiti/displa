import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { PrecioLente } from 'src/app/model/precioLente';
import { PrecioLenteClienteService } from 'src/services/precio.lente.cliente.service';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { Lente } from 'src/app/model/lente';


@Component({
  selector: 'app-precio-lente-cliente-listado',
  templateUrl: './precio-lente-listado.component.html',
  styleUrls: ['./precio-lente-listado.component.css']
})
export class PrecioLenteListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Optica', 'Domicilio', 'Telefonos', 'Mail', 'UtilizaIibb', 'Borrado'];
  columns;                      
  dataSource = new MatTableDataSource<Lente>();
  traerActivos: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private precioLenteClienteService: PrecioLenteClienteService,
    private lenteService: LenteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadPrecioLentePage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioLentePage() {
    this.loadingSpinnerService.show()
    if (this.traerActivos == true) {
      this.lenteService.getLentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          // console.log(this.dataSource.data)
          this.columns=[
            {columnDef:'Nombre',header:'Nombre',cell:(element:any)=>`${element.Nombre}`}]
          
          this.loadingSpinnerService.hide();
        })
    }
  }


}
