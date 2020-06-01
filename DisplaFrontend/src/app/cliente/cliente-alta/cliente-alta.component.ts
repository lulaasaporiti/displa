import { Component, Inject, OnInit } from '@angular/core';
import { LocalidadService } from 'src/services/localidad.service';
import { Localidad } from 'src/app/model/localidad';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ClienteService } from 'src/services/cliente.service';
import { Cliente } from 'src/app/model/Cliente';
import { CondicionVenta } from 'src/app/model/condicionVenta';
import { CategoriaIVA } from 'src/app/model/categoriaIva';
import { CategoriaIVAService } from 'src/services/categoria.iva.service';
import { CondicionVentaService } from 'src/services/condicion.venta.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-cliente-alta',
  templateUrl: './cliente-alta.component.html',
  styleUrls: ['./cliente-alta.component.css']
})
export class ClienteAltaComponent implements OnInit {
  modelCliente = <Cliente>{};
  localidades: Localidad[];
  localidadesControl = new FormControl();
  filteredLocalidades: Observable<Localidad[]>;
  condicionesVenta: CondicionVenta[];
  categoriasIva: CategoriaIVA[];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private localidadService: LocalidadService,
    private categoriaIvaService: CategoriaIVAService,
    private condicionVentaService: CondicionVentaService,
    private loadingSpinnerService: LoadingSpinnerService,
  ) {

  }


  ngOnInit() {
    this.loadingSpinnerService.show();
    combineLatest(
      this.localidadService.getLocalidadesVigentesList(),
      this.categoriaIvaService.getCategoriaIVAVigentesList(),
      this.condicionVentaService.getCondicionVentaVigentesList()
    ).subscribe(result => {
      this.localidades = result[0];
      this.filteredLocalidades = this.localidadesControl.valueChanges
        .pipe(
          startWith(''),
          // map(value => typeof value === 'string' ? value : value.Nombre),
          map(val => this.filterLocalidad(val))

          // map(Nombre => Nombre ? this._filter(Nombre) : this.localidades.slice())
        );
      this.categoriasIva = result[1];
      this.condicionesVenta = result[2];
      this.loadingSpinnerService.hide();
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

  cancelar(){
    this.router.navigateByUrl('Cliente/Listado')
  }


  altaCliente(){
    this.clienteService.saveOrUpdateCliente(this.modelCliente).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl('Cliente/Modificacion?id='+data)
        this.sessionService.showSuccess("El cliente se agregó correctamente.");
      },
      error => {
        this.sessionService.showError("El cliente no se agregó.");
      }
    );
  }
}
