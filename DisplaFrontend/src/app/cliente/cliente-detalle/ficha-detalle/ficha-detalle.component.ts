import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { Params, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/services/cliente.service';
import { Ficha } from 'src/app/model/ficha';


@Component({
  selector: 'app-ficha-detalle',
  templateUrl: './ficha-detalle.component.html',
  styleUrls: ['./ficha-detalle.component.css'],
})
export class FichaDetalleComponent implements OnInit {

  idCliente: number;
  ficha: Ficha[] = [];
  modelFicha = <Ficha>{};

  constructor(
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
    this.clienteService.getFicha(this.idCliente)
    .subscribe(r => {
      this.ficha = r;
      this.loadingSpinnerService.hide();
    })
  }


}
