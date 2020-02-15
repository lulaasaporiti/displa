import { Component, Inject, EventEmitter } from '@angular/core';
import { PrecioLente } from 'src/app/model/precioLente';
import { Lente } from 'src/app/model/lente';

@Component({
  selector: 'app-lente-alta',
  templateUrl: './lente-alta.component.html',
  styleUrls: ['./lente-alta.component.css']
})
export class LenteAltaComponent {
  modelPrecio: PrecioLente[] = [];
  selectedPrecio = new EventEmitter<PrecioLente[]>();
  modelLente = <Lente>{};

  constructor() {
      // console.log(data)
  }


  agregarPrecio() {
      let item = <PrecioLente>{};
      this.modelPrecio.push(item);
  }

  eliminarPrecio(index) {
    this.modelPrecio.splice(index,1);
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


}
