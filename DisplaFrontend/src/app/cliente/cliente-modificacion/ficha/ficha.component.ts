import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/services/cliente.service';
import { Ficha } from 'src/app/model/ficha';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FichaAltaComponent } from './ficha-alta/ficha-alta.component';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css'],
})
export class FichaComponent implements OnInit {

  idCliente: number;
  
  displayedColumns: string[] = ['Fecha', 'Descripcion'];
  dataSource = new MatTableDataSource<any>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private segment: ActivatedRoute,
    private loadingSpinnerService: LoadingSpinnerService) {
    this.segment.queryParams.subscribe((params: Params) => {
    this.idCliente = +params['id']; // (+) converts string 'id' to a number;
    });
    this.loadingSpinnerService.show();
    this.traerFicha();
  }

  ngOnInit() {
    
  }

  traerFicha(){
    this.clienteService.getFicha(this.idCliente).subscribe(r => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data = r;
      this.loadingSpinnerService.hide();
    })
  }


  cancelar(){
    this.router.navigateByUrl('Cliente/Listado')
  }

  agregarFicha(){
    let modelFicha = <Ficha>{};
    modelFicha.IdCliente = this.idCliente;  
    const dialogRef = this.dialog.open(FichaAltaComponent, {
      data: { modelFicha: modelFicha }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.clienteService.saveFicha(modelFicha).subscribe(
          data => {
            // this.router.navigateByUrl('Cliente/Modificacion?id='+data)
            this.traerFicha();
            this.sessionService.showSuccess("La ficha se editó correctamente.");
          },
          error => {
            this.sessionService.showError("La ficha no se editó.");
          }
        );
      }
    })

  }
}
