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
  ficha: any[] = [];
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
    this.traerFicha();
  }

  ngOnInit() {
    
  }

  traerFicha(){
    this.clienteService.getFicha(this.idCliente).subscribe(r => {
      console.log(r)
      this.ficha = r;
      this.modelFicha.Fecha = null;
      this.modelFicha.Descripcion = "";
      this.modelFicha.IdCliente = this.idCliente;
      this.loadingSpinnerService.hide();
    })
  }


  cancelar(){
    this.router.navigateByUrl('Cliente/Listado')
  }


  guardarFicha() {
    this.clienteService.saveFicha(this.modelFicha).subscribe(
      data => {
        console.log(data)
        // this.router.navigateByUrl('Cliente/Modificacion?id='+data)
        this.traerFicha();
        this.sessionService.showSuccess("La ficha se editó correctamente.");
      },
      error => {
        this.sessionService.showError("La ficha no se editó.");
      }
    );
  }
}
