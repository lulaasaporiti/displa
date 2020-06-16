import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ClienteService } from 'src/services/cliente.service';
import { Cliente } from 'src/app/model/Cliente';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-informacion-detalle',
  templateUrl: './informacion-detalle.component.html',
  styleUrls: ['./informacion-detalle.component.css']
})
export class InformacionDetalleComponent implements OnInit {
  private id: number = 0;
  modelCliente = <Cliente>{};
  disabledCheck = true;

  constructor(
    private segment: ActivatedRoute,
    private clienteService: ClienteService,
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
    this.loadingSpinnerService.hide();

  }

}
