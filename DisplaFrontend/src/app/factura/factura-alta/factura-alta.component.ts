import { Component, HostListener, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ClienteService } from 'src/services/cliente.service';
import { Cliente } from 'src/app/model/Cliente';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ProductoLenteComponent } from '../factura-producto/producto-lente/producto-lente/producto-lente.component';
import { ComprobanteCliente } from 'src/app/model/comprobanteCliente';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';
import { ComprobanteItemLente } from 'src/app/model/comprobanteItemLente';


@Component({
  selector: 'app-factura-alta',
  templateUrl: './factura-alta.component.html',
  styleUrls: ['./factura-alta.component.css']
})
export class FacturaAltaComponent implements OnInit {
  modelCliente = <Cliente>{};
  private id: number = 0;
  panelOpenState = false;
  displayedColumns: string[] = ['Cantidad', 'Sobre', 'Descripcion','Esferico', 'Cilindrico','Recargo', 'Importe', 'Borrar'];
  productos: string[] = ['Lentes', 'Varios', 'Servicios', 'Libres', 'Descuento', 'Totales'];
  dataSource = new MatTableDataSource<any>();
  key;
  modelComprobante = <ComprobanteCliente>{};

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key) {
      case "F1": { //lentes
        const dialogRef = this.dialog.open(ProductoLenteComponent,  {
          disableClose: true,
          data: { idCliente: this.id },
          width: '500px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarLente(result);
        //     console.log(result)
        //     this.router.navigateByUrl('Factura/Alta?id=' + result.idCliente);
          }
        });
        event.preventDefault();
        break;
      }
      case "F3": { //varios
        event.preventDefault();
        break;
      }
      case "F4": { //servicios
        event.preventDefault();
        break;
      }
      case "F5": { //libres
        event.preventDefault();
        break;
      }
      case "F6": { //descuento
        event.preventDefault();
        break;
      }
      case "F7": { //totales
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  }

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private segment: ActivatedRoute,
    private dialog: MatDialog,
    private loadingSpinnerService: LoadingSpinnerService,
  ) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number;
    });
    if (this.id) {
      this.loadingSpinnerService.show()
      this.clienteService.getById(this.id)
        .subscribe(l => {
          this.modelCliente = l;
          // console.log(l)
          this.loadingSpinnerService.hide();
        });
    }
  }

  

  ngOnInit() {
    this.loadingSpinnerService.show();
    combineLatest(

    ).subscribe(result => {
     
      this.loadingSpinnerService.hide();
    });

  }

  myScript(event){
  console.log(event)

  }

  cancelar(){
    this.router.navigateByUrl('Cliente/Listado')
  }


  altaCliente(){
    this.clienteService.saveOrUpdateCliente(this.modelCliente).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl('Cliente/Modificacion?id='+data)
        this.sessionService.showSuccess("El cliente se agregó correctamente.");
      },
      error => {
        this.sessionService.showError("El cliente no se agregó.");
      }
    );
  }

  cargarLente(producto){
    console.log(producto)
    let item = <ComprobanteItem>{};
    // item.NumeroSobre = producto.Sobre;
    this.dataSource.data.push(item);
  }
}
