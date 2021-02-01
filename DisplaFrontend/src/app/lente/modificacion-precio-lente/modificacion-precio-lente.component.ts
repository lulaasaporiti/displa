import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PrecioLente } from 'src/app/model/precioLente';
import { LenteService } from 'src/services/lente.service';
import { Lente } from 'src/app/model/lente';

@Component({
  selector: 'app-modificacion-precio-lente',
  templateUrl: './modificacion-precio-lente.component.html',
  styleUrls: ['./modificacion-precio-lente.component.css']
})
export class ModificacionPrecioLenteComponent implements OnInit {
  modelPrecio: PrecioLente[] = [];
  selectedPrecio = new EventEmitter<PrecioLente[]>();
  modelLente = <Lente>{};
  
  constructor(
    public dialogRef: MatDialogRef<ModificacionPrecioLenteComponent>,
    private lenteService: LenteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
      this.lenteService.getById(this.data.idLente)
        .subscribe(l => {
          this.modelLente = l;
          this.modelPrecio = this.modelLente.PrecioLente;
        });
    
  }

  agregarRangoPrecio() {
    let item = <PrecioLente>{};
    item.IdLente = this.modelLente.Id;
    this.modelPrecio.push(item);
  }

  agregarPrecio(i) {
    let item = <PrecioLente>{};
    item.IdLente = this.modelLente.Id;
    item.MedidaEsferico = this.modelPrecio[i].MedidaEsferico;
    item.MedidaCilindrico = this.modelPrecio[i].MedidaCilindrico;
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


  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
