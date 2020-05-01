import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Localidad } from 'src/app/model/localidad';
import { LocalidadService } from 'src/services/localidad.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Cliente } from 'src/app/model/Cliente';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-cliente-modificacion',
  templateUrl: './cliente-modificacion.component.html',
  styleUrls: ['./cliente-modificacion.component.css']
})
export class ClienteModificacionComponent implements OnInit {
  id: number;
  modelCliente = <Cliente>{};
  localidades: Localidad[];
  localidadesControl = new FormControl();
  filteredLocalidades: Observable<Localidad[]>;

  constructor(
    private router: Router,
    private segment: ActivatedRoute,
    private clienteService: ClienteService,
    private loadingSpinnerService: LoadingSpinnerService,
    private localidadService: LocalidadService) {
      this.segment.queryParams.subscribe((params: Params) => {
        this.id = +params['id']; // (+) converts string 'id' to a number;
      });
      if (this.id) {
        this.loadingSpinnerService.show()
        this.clienteService.getById(this.id)
          .subscribe(c => {
            this.modelCliente = c;
            this.loadingSpinnerService.hide();
          });
      }

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

  setIdLocalidad(control) {
    if (control.value != null) this.modelCliente.IdLocalidad = control.value;
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