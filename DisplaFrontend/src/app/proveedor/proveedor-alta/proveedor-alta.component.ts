import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
    if (control.value != null) data.modelProveedor.idLocalidad = control.value.id;
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
