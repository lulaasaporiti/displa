import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoServicioService } from 'src/services/tipo.servicio.service';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { PrecioServicio } from 'src/app/model/precioServicio';

@Component({
  selector: 'app-servicio-alta',
  templateUrl: './servicio-alta.component.html',
  styleUrls: ['./servicio-alta.component.css']
})
export class ServicioAltaComponent implements OnInit {
  tiposServicio: TipoServicio[];
  // modelPrecio: PrecioServicio[] = [];
  selectedPrecio = new EventEmitter<PrecioServicio[]>();


  constructor(
    public dialogRef: MatDialogRef<ServicioAltaComponent>,
    private tipoServicioService: TipoServicioService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // console.log(data)
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
