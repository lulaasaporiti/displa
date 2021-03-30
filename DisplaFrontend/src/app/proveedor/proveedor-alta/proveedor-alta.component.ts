import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalidadService } from 'src/services/localidad.service';
import { Localidad } from 'src/app/model/localidad';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-proveedor-alta',
  templateUrl: './proveedor-alta.component.html',
  styleUrls: ['./proveedor-alta.component.css']
})
export class ProveedorAltaComponent implements OnInit {
  localidades: Localidad[];
  localidadesControl = new FormControl();
  
  filteredLocalidades: Observable<Localidad[]>;
  cuitValido = true;

  constructor(
    public dialogRef: MatDialogRef<ProveedorAltaComponent>,
    private localidadService: LocalidadService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.localidadService.getLocalidadesVigentesList().subscribe(r => {
      this.localidades = r;
      this.filteredLocalidades = this.localidadesControl.valueChanges
      .pipe(
        startWith(''),
        // map(value => typeof value === 'string' ? value : value.Nombre),
        map(val => this.filterLocalidad(val))

        // map(Nombre => Nombre ? this._filter(Nombre) : this.localidades.slice())
      );
    });
  }

  displayLocalidad(l?: Localidad): string | undefined {
    return l ? l.Nombre + ' - ' + l.Cp : undefined;
  }

  //Cuando se ingresa un cuit se valida si es válido. En caso de que lo sea, comprueba
  //si ya existe registrado en la base de datos.
  validarCuit() {
    this.cuitValido = true;
    if (this.data.modelProveedor.Cuit != '' && this.data.modelProveedor.Cuit != undefined)
      if (this.data.modelProveedor.Cuit.length == 11) {
        let longitud = this.data.modelProveedor.Cuit.length;
        let acumulado = 0;
        let digitoVerificacion = parseInt(this.data.modelProveedor.Cuit.charAt(this.data.modelProveedor.Cuit.length - 1), 10);
        for (let x = 0; x < longitud - 1; x++) {
          let nro = parseInt(this.data.modelProveedor.Cuit.charAt(9 - x), 10);
          acumulado += (nro * (2 + (x % 6)));
        }

        let verificacion = 11 - (acumulado % 11);
        if (verificacion == 11) {
          verificacion = 0
        }

        this.cuitValido = (verificacion == digitoVerificacion);
      }
      else {
        this.cuitValido = false;
      }
  }

  private _filter(Nombre: string): Localidad[] {
    const filterValue = Nombre.toLowerCase();

    return this.localidades.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelProveedor.Nombre != "" && this.data.modelProveedor.Nombre != undefined)
      this.dialogRef.close(this.data);
  }

  setIdLocalidad(control, data) {
    console.log(data)
    console.log(control)
    if (control.value != null) data.modelProveedor.IdLocalidad = control.value;
}

filterLocalidad(nombre: any): Localidad[] {
  if (nombre.length >= 0) {
      var s: string;
      try {
          s = nombre.toLowerCase();
      }
      catch (ex) {
          s = nombre.nombre.toLowerCase();
      }
      return this.localidades.filter(localidad =>
          localidad.Nombre.toLowerCase().indexOf(s) !== -1);
  } else {
      return [];
  }
}

}
