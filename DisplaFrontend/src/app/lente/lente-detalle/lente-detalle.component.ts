import { Component, EventEmitter } from '@angular/core';
import { PrecioLente } from 'src/app/model/precioLente';
import { RecargoLente } from 'src/app/model/recargoLente';
import { Lente } from 'src/app/model/lente';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lente-detalle',
  templateUrl: './lente-detalle.component.html',
  styleUrls: ['./lente-detalle.component.css']
})
export class LenteDetalleComponent {
  modelPrecio: PrecioLente[] = [];
  selectedPrecio = new EventEmitter<PrecioLente[]>();
  modelRecargo: RecargoLente[] = [];
  selectedRecargo = new EventEmitter<RecargoLente[]>();
  modelLente = <Lente>{};
  private id: number = 0;

  constructor(
    private lenteService: LenteService,
    private loadingSpinnerService: LoadingSpinnerService,
    private router: Router,
    private segment: ActivatedRoute

  ) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number;
    });
    if (this.id) {
      this.loadingSpinnerService.show()
      this.lenteService.getById(this.id)
        .subscribe(l => {
          this.modelLente = l;
          this.modelPrecio = this.modelLente.PrecioLente;
          this.modelRecargo = this.modelLente.RecargoLente;
          this.loadingSpinnerService.hide();
        });
    }
  }

  cancelar() {
    this.router.navigateByUrl('Lente/Listado')
  }

  agregarRangoPrecio() {
    let item = <PrecioLente>{};
    item.IdLente = this.modelLente.Id;
    this.modelPrecio.push(item);
  }

  agregarPrecio(i) {
    let item = <PrecioLente>{};
    item.IdLente = this.modelLente.Id;
    item.Esferico = this.modelPrecio[i].Esferico;
    item.Cilindrico = this.modelPrecio[i].Cilindrico;
    this.modelPrecio.push(item);
  }

  eliminarPrecio(index) {
    this.modelPrecio.splice(index, 1);
    this.updateStatePrecio();
  }

  precioSelected() {
    this.updateStatePrecio();
  }

  updateStatePrecio() {
    //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
    //y el ngOnChanges() lo detecte
    let modelPrecio = JSON.parse(JSON.stringify(this.modelPrecio));
    this.selectedPrecio.emit(modelPrecio);
  }

  agregarRecargo() {
    let item = <RecargoLente>{};
    item.IdLente = this.modelLente.Id;
    this.modelRecargo.push(item);
  }

  eliminarRecargo(index) {
    this.modelRecargo.splice(index, 1);
    this.updateStateRecargo();
  }

  recargoSelected() {
    this.updateStateRecargo();
  }

  updateStateRecargo() {
    //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
    //y el ngOnChanges() lo detecte
    let modelRecargo = JSON.parse(JSON.stringify(this.modelRecargo));
    this.selectedRecargo.emit(modelRecargo);
  }
}
