import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatOptionSelectionChange } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ServicioService } from 'src/services/servicio.service';
import { ClienteService } from 'src/services/cliente.service';
import { Servicio } from 'src/app/model/servicio';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';
import { TipoServicioService } from 'src/services/tipo.servicio.service';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { SessionService } from 'src/services/session.service';
import { VentaVirtual } from 'src/app/model/ventaVirtual';

@Component({
  selector: 'app-producto-servicio',
  templateUrl: './producto-servicio.component.html',
  styleUrls: ['./producto-servicio.component.css']
})
export class ProductoServicioComponent implements OnInit {
  servicios: Servicio[] = [];
  tipoServicios: TipoServicio[];
  serviciosControl = new FormControl();
  tipoServiciosControl = new FormControl();
  filteredServicios: Observable<Servicio[]>;
  filteredTipoServicios: Observable<TipoServicio[]>;
  idServicios: number[] = [];
  modelComprobanteItem = <ComprobanteItem>{};
  modelTipoServicio = <TipoServicio>{};
  preciosIsNull;
  @ViewChild('ser', { static: true }) ser;

  
  constructor(
    public dialogRef: MatDialogRef<ProductoServicioComponent>,
    private servicioService: ServicioService,
    private tipoServicioService: TipoServicioService,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.tipoServicioService.getTiposServicioConServiciosList().subscribe(r => {
      this.tipoServicios = r;
      this.filteredTipoServicios = this.tipoServiciosControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterTipoServicio(val))
        );
    });
  }

  displayServicio(a?: Servicio): string | undefined {
    return a ? a.Id + ' - ' + a.Nombre : undefined;
  }

  displayTipoServicio(t?: TipoServicio): string | undefined {
    return t ? t.Id + ' - ' + t.Nombre : undefined;
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement) {
    if (event.code == "Enter") {
      event.preventDefault();
      if (idElement == 'cantidad0') {
        this.ser.close();
        this.traerPrecio();
      }
      if (idElement.startsWith("cantidad")){
        if (+idElement.split("cantidad")[1] == this.data.comprobantesItems.length)
          idElement = 'seleccionar';
      }
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

  setIdTipoServicio(control) {
    if (control.value != null) {
      this.modelTipoServicio.Nombre = control.value;
    }
  }

  tipoServicioChange(event: MatOptionSelectionChange) {
    this.servicioService.getServiciosVigentesList()
      .subscribe(ser => {
        this.servicios = ser;
        this.servicios = this.servicios.filter(servi => servi.IdTipoServicio == event.source.value.Id)
      })
  }

  serviciosSeleccionados(event: MatOptionSelectionChange) {
    if (event.source.selected == true) {
      let comprobanteItem = <ComprobanteItem>{}
      comprobanteItem.IdServicio = event.source.value.Id;
      comprobanteItem.IdServicioNavigation = event.source.value;
      comprobanteItem.Descripcion = event.source.value.Nombre;
      comprobanteItem.NumeroSobre = this.modelComprobanteItem.NumeroSobre;
      this.data.comprobantesItems.push(comprobanteItem);
      let ventaVirtual = <VentaVirtual>{}
      ventaVirtual.IdServicioNavigation = event.source.value;
      ventaVirtual.IdServicio = event.source.value.Id;
      this.data.ventasVirtuales.push(ventaVirtual);
      this.idServicios.push(event.source.value.Id);
    }
    else {
      let i = this.data.comprobantesItems.findIndex(ci => ci.IdServicio == event.source.value.Id);
      this.data.comprobantesItems.splice(i, 1);
      this.idServicios.splice(i, 1);
    }
  }

  traerPrecio() {
    let mostrarMensaje = false;
    this.clienteService.getPrecioServicioFactura(this.data.idCliente, this.idServicios)
      .subscribe(result => {
        this.preciosIsNull = result;
        this.data.comprobantesItems.forEach(c => {
          c.Monto = result[c.IdServicio]
          if (result[c.IdServicio] == null)
          mostrarMensaje = true;
        c.Cantidad = 1;
        });
        if (mostrarMensaje) {
          this.sessionService.showInfo("No existe precio seleccionado para algún artículo.");
        }
      })
  }

  filterTipoServicio(nombre: any): TipoServicio[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.tipoServicios.filter(tipo =>
        tipo.Id.toString().indexOf(s) !== -1 || tipo.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }
}