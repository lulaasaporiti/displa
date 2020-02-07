import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { PrecioArticulo } from 'src/app/model/precioArticulo';

@Component({
  selector: 'app-articulo-vario-alta',
  templateUrl: './articulo-vario-alta.component.html',
  styleUrls: ['./articulo-vario-alta.component.css']
})
export class ArticuloVarioAltaComponent implements OnInit {
  tiposArticuloVario: TipoArticulo[];
  // modelPrecio: PrecioArticuloVario[] = [];
  selectedPrecio = new EventEmitter<PrecioArticulo[]>();


  constructor(
    public dialogRef: MatDialogRef<ArticuloVarioAltaComponent>,
    private tipoArticuloVarioService: TipoArticuloService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // console.log(data)
  }

  ngOnInit() {
    this.tipoArticuloVarioService.getTiposArticulosVigentesList().subscribe(r => {
      this.tiposArticuloVario = r;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  agregarPrecio() {
      let item = <PrecioArticulo>{};
      this.data.modelArticuloVario.PrecioArticulo.push(item);
  }

  eliminarUltimoPrecio() {
    this.data.modelArticuloVario.PrecioArticulo.pop();
    this.updateStatePrecio();
  }

  precioSelected() {
    this.updateStatePrecio();
  }

  updateStatePrecio() {
    //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
    //y el ngOnChanges() lo detecte
    let modelPrecio = JSON.parse(JSON.stringify(this.data.modelArticuloVario.PrecioArticulo));
    this.selectedPrecio.emit(modelPrecio);
  }


}
