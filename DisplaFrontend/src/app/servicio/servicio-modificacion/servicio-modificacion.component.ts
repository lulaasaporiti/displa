import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { TipoServicioService } from 'src/services/tipo.servicio.service';
import { PrecioServicio } from 'src/app/model/precioServicio';

@Component({
  selector: 'app-servicio-modificacion',
  templateUrl: './servicio-modificacion.component.html',
  styleUrls: ['./servicio-modificacion.component.css']
})
export class ServicioModificacionComponent implements OnInit{
  tiposServicio: TipoServicio[];
  selectedPrecio = new EventEmitter<PrecioServicio[]>();


  constructor( 
    public dialogRef: MatDialogRef<ServicioModificacionComponent>,
    private tipoServicioService: TipoServicioService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }

    ngOnInit() {
      this.tipoServicioService.getTiposServiciosVigentesList().subscribe(r => {
        this.tiposServicio = r;
      });
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