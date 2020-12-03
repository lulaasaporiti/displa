import { Component, Inject, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatOptionSelectionChange, MatSelect } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { startWith, map, takeUntil, take } from 'rxjs/operators';
import { Lente } from 'src/app/model/lente';
import { LenteService } from 'src/services/lente.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { ClienteService } from 'src/services/cliente.service';
import { ComprobanteItemLente } from 'src/app/model/comprobanteItemLente';
import { ValidacionLenteService } from 'src/services/validacion.lente.service';
import { ServicioService } from 'src/services/servicio.service';
import { Servicio } from 'src/app/model/servicio';
import { ComprobanteItemServicio } from 'src/app/model/comprobanteItemServicio';

@Component({
  selector: 'app-seleccion-lente',
  templateUrl: './seleccion-lente.component.html',
  styleUrls: ['./seleccion-lente.component.css']
})
export class SeleccionLenteComponent implements OnInit {
  @Output() selectedComprobanteItemLente = new EventEmitter<any[]>(); 
  @Output() selectedServiciosComprobanteItem = new EventEmitter<any[]>(); 
  
  lentes: Lente[];
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;
  limiteGrillaDerecha = <LimiteGrilla>{};
  limiteGrillaIzquierda = <LimiteGrilla>{};
  mostrarPrecio = false;
  modelComprobanteItemLente: any[] = [];
  msjCilindrico: boolean[] = [];
  msjLimiteEsferico: boolean[] = [];
  msjLimiteCilindrico: boolean[] = [];
  servicios: any[] = [];
  serviciosControl = new FormControl();
  bankMultiFilterCtrl: FormControl = new FormControl();
  filteredServicios: ReplaySubject<Servicio[]> = new ReplaySubject<Servicio[]> ();
  deshabilitar: boolean = true;
  serviciosLente: ComprobanteItemServicio[] = []

 _onDestroy = new Subject<void>();
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  constructor(
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private validacionLenteService: ValidacionLenteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      let cargarGraduacion= <ComprobanteItemLente>{};
      cargarGraduacion.MedidaEsferico = 0;
      cargarGraduacion.MedidaCilindrico = 0;
      this.modelComprobanteItemLente.push(cargarGraduacion);
  }


  ngOnInit() {
    this.getCalibrados();
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      this.mostrarPrecio = false;
      document.getElementById("lente").focus();
      this.filteredLentes = this.lentesControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterLente(val))
        );

    });
  }

  ngAfterViewInit() {
    // document.getElementById("lente").focus();
  }

  displayLente(l?: Lente): string | undefined {
    return l ? l.Id + ' - ' + l.Nombre : undefined;
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
    if (idElement == "esferico0") {
      this.deshabilitar = false;
    }
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
      if(idElement == "remove"){
        document.getElementById(idElement).style.backgroundColor="#e0e0e0";
      }
    }
  }

  flechita(event: KeyboardEvent, idElement)
  {
    if (event.code == "ArrowLeft") {
      document.getElementById(idElement).focus();
      document.getElementById(idElement).style.backgroundColor="#e0e0e0";
      document.getElementById("remove").style.backgroundColor="transparent";
    }    
    if (event.code == "ArrowRight") {
      document.getElementById(idElement).focus();
      document.getElementById(idElement).style.backgroundColor="#e0e0e0";
      document.getElementById("done").style.backgroundColor="transparent";
    }    
  }

  setIdLente(control) {
    if (control.value != null) {
      this.modelComprobanteItemLente[0].IdLente = control.value.Id;
      this.modelComprobanteItemLente[0].IdLenteNavigation = control.value;      
    }
  }

  traerPrecio(i){
    this.clienteService.getPrecioLenteFactura(this.data.idCliente, this.modelComprobanteItemLente[+i].IdLente, this.modelComprobanteItemLente[+i].MedidaEsferico, this.modelComprobanteItemLente[+i].MedidaCilindrico)
    .subscribe(result => {
      this.mostrarPrecio = true;
      this.modelComprobanteItemLente[+i].Precio = result;
      if (i == 0){
        this.modelComprobanteItemLente[0].Sobre = 0;
        this.modelComprobanteItemLente[+i].Cantidad = 1;
      }
    })
  }

  setInitialValue() {
    this.filteredServicios
      // .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Servicio, b: Servicio) => a && b && a.Id === b.Id;
      });
      }

  getCalibrados() {
    this.servicioService.getCalibrados(this.data.idCliente)
      .subscribe(s => {
        this.servicios = s;
        // console.log(s)
        this.filteredServicios.next(this.servicios.slice());
        this.bankMultiFilterCtrl.valueChanges
          // .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterServicios();
          });
      })

    // this.filteredServicios.next(this.servicios.slice());
    // this.bankMultiFilterCtrl.valueChanges
    // // .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterServicios();
    //   });
  }

  serviciosSeleccionados(event: MatOptionSelectionChange) {
    if (event.source.selected == true) {
      let comprobanteItem = <ComprobanteItemServicio>{}
      comprobanteItem.IdServicio = event.source.value.Id;
      comprobanteItem.IdServicioNavigation = event.source.value;
      this.serviciosLente.push(comprobanteItem);
    }
    else {
      let i = this.serviciosLente.findIndex(ci => ci.IdServicio == event.source.value.Id);
      this.serviciosLente.splice(i, 1);
    }
    // console.log(this.serviciosLente)
}

  agregarGraduacion() {
    this.modelComprobanteItemLente[0].Cantidad = 0.5;
    let item = <ComprobanteItemLente>{};
    item.IdLente = this.modelComprobanteItemLente[0].IdLente;
    item.Cantidad = 0.5;
    item.MedidaEsferico = 0;
    item.MedidaCilindrico = 0;
    this.modelComprobanteItemLente.push(item);
  }

  eliminarUltimaGraduacion(i) {
    this.modelComprobanteItemLente.splice(+i, 1);
  }

  filterLente(nombre: any): Lente[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.lentes.filter(lente =>
        lente.Id.toString().indexOf(s) !== -1 || lente.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  filterServicios() {
    if (!this.servicios) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredServicios.next(this.servicios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredServicios.next(
      this.servicios.filter(ser => ser.Id.toString().indexOf(search) !== -1 || ser.Nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  comprobanteItemLenteSelected() {
    this.selectedComprobanteItemLente.emit(this.modelComprobanteItemLente);
    this.selectedServiciosComprobanteItem.emit(this.serviciosLente);
  }

  compararLimiteGrilla(index, tipoGraduacion) {
    if (tipoGraduacion == 'esferico') {
      this.msjLimiteEsferico[index] = this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[index].MedidaEsferico, 'esferico')
    }
    else {
      this.msjLimiteCilindrico[index] = this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[index].MedidaCilindrico, 'cilindrico')
    }
  }
}