import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/services/cliente.service';
import { Ficha } from 'src/app/model/ficha';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css'],
})
export class FichaComponent implements OnInit {

  idCliente: number;
  ficha: Ficha[] = [];
  modelFicha = <Ficha>{};

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private segment: ActivatedRoute,
    private loadingSpinnerService: LoadingSpinnerService) {
    this.segment.queryParams.subscribe((params: Params) => {
    this.idCliente = +params['id']; // (+) converts string 'id' to a number;
    });
    this.loadingSpinnerService.show();
    this.clienteService.getFicha(this.idCliente).subscribe(r => {
      console.log(r)
      this.ficha = r;
      this.loadingSpinnerService.hide();
    })
  }

  ngOnInit() {
    
  }


  cancelar(){
    this.router.navigateByUrl('Cliente/Listado')
  }


  guardarFicha() {
    
  }
}
