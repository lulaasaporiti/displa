import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrecioLente } from 'src/app/model/precioLente';
import { ServicioService } from 'src/services/servicio.service';
import { Servicio } from 'src/app/model/servicio';
import { PrecioServicio } from 'src/app/model/precioServicio';

@Component({
  selector: 'app-modificacion-precio-servicio',
  templateUrl: './modificacion-precio-servicio.component.html',
  styleUrls: ['./modificacion-precio-servicio.component.css']
})
export class ModificacionPrecioServicioComponent implements OnInit {
  modelPrecio: PrecioServicio[] = [];
  selectedPrecio = new EventEmitter<PrecioServicio[]>();
  modelServicio = <Servicio>{};
  
  constructor(
    public dialogRef: MatDialogRef<ModificacionPrecioServicioComponent>,
    private servicioService: ServicioService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
      this.servicioService.getById(this.data.idServicio)
        .subscribe(s => {
          this.modelServicio = s;
          console.log(s)
          this.modelPrecio = this.modelServicio.PrecioServicio;
        });
    
  }

  agregarPrecio() {
    let item = <PrecioServicio>{};
    item.IdServicio = this.modelServicio.Id;
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
