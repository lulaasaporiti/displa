import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LocalidadService } from 'src/services/localidad.service';
import { Localidad } from 'src/app/model/localidad';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-alta',
  templateUrl: './cliente-alta.component.html',
  styleUrls: ['./cliente-alta.component.css']
})
export class ClienteAltaComponent implements OnInit {
  localidades: Localidad[];
  localidadesControl = new FormControl();
  filteredLocalidades: Observable<Localidad[]>;

  constructor(
    public dialogRef: MatDialogRef<ClienteAltaComponent>,
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
    if (this.data.modelCliente.Nombre != "" && this.data.modelCliente.Nombre != undefined)
      this.dialogRef.close(this.data);
  }

  setIdLocalidad(control, data) {
    if (control.value != null) data.modelCliente.IdLocalidad = control.value;
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
