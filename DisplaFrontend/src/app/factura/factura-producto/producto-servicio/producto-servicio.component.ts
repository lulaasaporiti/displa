import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ServicioService } from 'src/services/servicio.service';
import { ClienteService } from 'src/services/cliente.service';
import { Servicio } from 'src/app/model/servicio';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';

@Component({
  selector: 'app-producto-servicio',
  templateUrl: './producto-servicio.component.html',
  styleUrls: ['./producto-servicio.component.css']
})
export class ProductoServicioComponent implements OnInit {
  servicios: Servicio[];
  serviciosControl = new FormControl();
  filteredServicios: Observable<Servicio[]>;
  modelComprobanteItem = <ComprobanteItem>{};

  constructor(
    public dialogRef: MatDialogRef<ProductoServicioComponent>,
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
  }


  ngOnInit() {
    this.servicioService.getServiciosVigentesList().subscribe(r => {
      this.servicios = r;
      console.log(this.servicios)
      this.filteredServicios = this.serviciosControl.valueChanges
        .pipe(
          startWith(''),
          // map(value => typeof value === 'string' ? value : value.Nombre),
          map(val => this.filterServicio(val))

          // map(Nombre => Nombre ? this._filter(Nombre) : this.servicios.slice())
        );
    });
  }

  displayServicio(a?: Servicio): string | undefined {
    return a ? a.Id + ' - ' + a.Nombre : undefined;
  }

  private _filter(Nombre: string): Servicio[] {
    const filterValue = Nombre.toLowerCase();
    return this.servicios.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement)
  {
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
    }
  }

  setIdServicio(control) {
    if (control.value != null) {
      this.modelComprobanteItem.IdServicio = control.value.Id;
      this.modelComprobanteItem.IdServicioNavigation = control.value;
      this.traerPrecio();
    }
  }

  traerPrecio(){
    this.clienteService.getPrecioServicioFactura(this.data.idCliente, this.modelComprobanteItem.IdServicio)
    .subscribe(result => {
      this.modelComprobanteItem.Cantidad = 1;
      this.modelComprobanteItem.Monto = result;
    })
  }

  filterServicio(nombre: any): Servicio[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.servicios.filter(servicio =>
        servicio.Id.toString().indexOf(s) !== -1 || servicio.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }
}