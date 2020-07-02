import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TipoServicioService } from 'src/services/tipo.servicio.service';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { PrecioServicio } from 'src/app/model/precioServicio';

@Component({
  selector: 'app-stock-alta',
  templateUrl: './stock-alta.component.html',
  styleUrls: ['./stock-alta.component.css']
})
export class StockAltaComponent implements OnInit {
  tiposServicio: TipoServicio[];
  // modelPrecio: PrecioServicio[] = [];
  selectedPrecio = new EventEmitter<PrecioServicio[]>();


  constructor(
    public dialogRef: MatDialogRef<StockAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
  }

  ngOnInit() {
 
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  agregarPrecio() {
      let item = <PrecioServicio>{};
      this.data.modelServicio.PrecioServicio.push(item);
  }

  eliminarUltimoPrecio() {
    this.data.modelServicio.PrecioServicio.pop();
    this.updateStatePrecio();
  }

  precioSelected() {
    this.updateStatePrecio();
  }

  updateStatePrecio() {
    //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
    //y el ngOnChanges() lo detecte
    let modelPrecio = JSON.parse(JSON.stringify(this.data.modelServicio.PrecioServicio));
    this.selectedPrecio.emit(modelPrecio);
  }


}
