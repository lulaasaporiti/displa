import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrecioLente } from 'src/app/model/precioLente';
import { LenteService } from 'src/services/lente.service';
import { Lente } from 'src/app/model/lente';
import { PrecioArticulo } from 'src/app/model/precioArticulo';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';

@Component({
  selector: 'app-modificacion-precio-articulo-vario',
  templateUrl: './modificacion-precio-articulo-vario.component.html',
  styleUrls: ['./modificacion-precio-articulo-vario.component.css']
})
export class ModificacionPrecioArticuloVarioComponent implements OnInit {
  modelPrecio: PrecioArticulo[] = [];
  selectedPrecio = new EventEmitter<PrecioArticulo[]>();
  modelArticuloVario = <ArticuloVario>{};
  
  constructor(
    public dialogRef: MatDialogRef<ModificacionPrecioArticuloVarioComponent>,
    private articuloVarioService: ArticuloVarioService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
      this.articuloVarioService.getById(this.data.idArticulo)
        .subscribe(l => {
          this.modelArticuloVario = l;
          this.modelPrecio = this.modelArticuloVario.PrecioArticulo;
        });
    
  }

  agregarPrecio() {
    let item = <PrecioArticulo>{};
    item.IdArticulo = this.modelArticuloVario.Id;
    this.modelArticuloVario.PrecioArticulo.push(item);
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
    let modelPrecio = JSON.parse(JSON.stringify(this.modelArticuloVario.PrecioArticulo));
    this.selectedPrecio.emit(modelPrecio);
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
