import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventEmitter } from 'protractor';
import { PrecioLente } from 'src/app/model/precioLente';

@Component({
  selector: 'app-modificacion-precio-lente',
  templateUrl: './modificacion-precio-lente.component.html',
  styleUrls: ['./modificacion-precio-lente.component.css']
})
export class ModificacionPrecioLenteComponent implements OnInit {
  modelPrecio: PrecioLente[] = [];
  // selectedPrecio = new EventEmitter<PrecioLente[]>();
  
  constructor(
    public dialogRef: MatDialogRef<ModificacionPrecioLenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
      this.modelPrecio = this.data.lente.PrecioLente;
      console.log(this.modelPrecio)

  }

  ngOnInit() {
   
  }
  agregarRangoPrecio() {
    let item = <PrecioLente>{};
    item.IdLente = this.data.lente.Id;
    this.modelPrecio.push(item);
  }

  agregarPrecio(i) {
    let item = <PrecioLente>{};
    item.IdLente = this.data.lente.Id;
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
    // this.selectedPrecio.emit(modelPrecio);
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
