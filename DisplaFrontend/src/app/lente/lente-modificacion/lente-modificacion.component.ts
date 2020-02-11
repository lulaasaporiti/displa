import { Component, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PrecioLente } from 'src/app/model/precioLente';

@Component({
  selector: 'app-lente-modificacion',
  templateUrl: './lente-modificacion.component.html',
  styleUrls: ['./lente-modificacion.component.css']
})
export class LenteModificacionComponent {
  selectedPrecio = new EventEmitter<PrecioLente[]>();


  constructor( 
    public dialogRef: MatDialogRef<LenteModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  agregarPrecio() {
    let item = <PrecioLente>{};
    this.data.modelLente.PrecioLente.push(item);
}

eliminarUltimoPrecio() {
  this.data.modelLente.PrecioLente.pop();
  this.updateStatePrecio();
}

precioSelected() {
  this.updateStatePrecio();
}

updateStatePrecio() {
  //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
  //y el ngOnChanges() lo detecte
  let modelPrecio = JSON.parse(JSON.stringify(this.data.modelLente.PrecioLente));
  this.selectedPrecio.emit(modelPrecio);
}
}