import { Component, Inject, OnInit } from '@angular/core';
import { LocalidadService } from 'src/services/localidad.service';
import { combineLatest } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ClienteService } from 'src/services/cliente.service';
import { Cliente } from 'src/app/model/Cliente';
import { CategoriaIVAService } from 'src/services/categoria.iva.service';
import { CondicionVentaService } from 'src/services/condicion.venta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-factura-alta',
  templateUrl: './factura-alta.component.html',
  styleUrls: ['./factura-alta.component.css']
})
export class FacturaAltaComponent implements OnInit {
  modelCliente = <Cliente>{};
  private id: number = 0;
  displayedColumns: string[] = ['Cantidad','Sobre','Descripcion','Esferico', 'Cilindrico','Recargo', 'Importe', 'Borrar'];
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private segment: ActivatedRoute,
    private localidadService: LocalidadService,
    private categoriaIvaService: CategoriaIVAService,
    private condicionVentaService: CondicionVentaService,
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
          this.loadingSpinnerService.hide();
        });
    }
  }


  ngOnInit() {
    this.loadingSpinnerService.show();
    combineLatest(
      this.localidadService.getLocalidadesVigentesList(),
      this.categoriaIvaService.getCategoriaIVAVigentesList(),
      this.condicionVentaService.getCondicionVentaVigentesList()
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
}
