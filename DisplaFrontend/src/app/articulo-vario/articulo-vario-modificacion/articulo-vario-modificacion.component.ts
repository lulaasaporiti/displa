import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { PrecioArticulo } from 'src/app/model/precioArticulo';

@Component({
  selector: 'app-articulo-vario-modificacion',
  templateUrl: './articulo-vario-modificacion.component.html',
  styleUrls: ['./articulo-vario-modificacion.component.css']
})
export class ArticuloVarioModificacionComponent implements OnInit{
  tiposArticuloVario: TipoArticulo[];
  selectedPrecio = new EventEmitter<PrecioArticulo[]>();


  constructor( 
    public dialogRef: MatDialogRef<ArticuloVarioModificacionComponent>,
    private tipoArticuloVarioService: TipoArticuloService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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