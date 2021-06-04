import { Component, Inject, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ParametroService } from 'src/services/parametro.service';
import { Parametro } from 'src/app/model/parametro';

@Component({
  selector: 'app-seleccion-lente',
  templateUrl: './seleccion-lente.component.html',
  styleUrls: ['./seleccion-lente.component.css']
})
export class SeleccionLenteComponent implements OnInit {
  @Output() selectedComprobanteItemLente = new EventEmitter<any[]>(); 
  @Output() selectedServiciosComprobanteItem = new EventEmitter<any[]>();
  @Output() selectedIndiceCalibrados = new EventEmitter<number>();
  // @Output() disableButton: boolean
  
  lentes: Lente[];
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;
  filteredServicios: Observable<Servicio[]>;
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
  // filteredServicios: ReplaySubject<Servicio[]> = new ReplaySubject<Servicio[]> ();
  deshabilitar: boolean = true;
  serviciosLente: ComprobanteItemServicio[] = [];
  disableButton: boolean;
  parametro: Parametro;

 _onDestroy = new Subject<void>();
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  constructor(
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private parametroService: ParametroService,
    public validacionLenteService: ValidacionLenteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      let cargarGraduacion = <ComprobanteItemLente>{};
      cargarGraduacion.MedidaEsferico = 0;
      cargarGraduacion.MedidaCilindrico = 0;
      this.modelComprobanteItemLente.push(cargarGraduacion);
      this.parametroService.getParametro().subscribe(r => {
        this.parametro = r;
      });
  }


  ngOnInit() {
    this.disableButton = false
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

  displayServicio(s?: Servicio): string | undefined {
    return s ? s.Id + ' - ' + s.Nombre + ' - Precio ' + s.PrecioServicio[0].Precio : undefined;
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  _keyPressCilindrico(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  _keyPressCantidad(event: any) {
    const pattern = /[0-9.]/;
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
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        document.getElementById(idElement).focus();
      },0); 
      if(idElement == "remove"){
        document.getElementById(idElement).style.backgroundColor="#e0e0e0";
        document.getElementById("remove-button").focus();
      }
    }
  }

  flechita(event: KeyboardEvent, idElement)
  {
    if (event.code == "ArrowLeft") {
      document.getElementById("done-button").focus();
      document.getElementById(idElement).style.backgroundColor="#e0e0e0";
      document.getElementById("remove").style.backgroundColor="transparent";
    }    
    if (event.code == "ArrowRight") {
      document.getElementById("remove-button").focus();
      document.getElementById(idElement).style.backgroundColor="#e0e0e0";
      document.getElementById("done").style.backgroundColor="transparent";
    }    
  }

  setIdLente(control) {
    if (control.value != null) {
      this.modelComprobanteItemLente[0].IdLente = control.value.Id;
      this.modelComprobanteItemLente[0].IdLenteNavigation = control.value;
      this.validacionLenteService.getLimitesGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation)
    }
  }

  traerPrecio(i){
    this.clienteService.getPrecioLenteFactura(this.data.idCliente, this.modelComprobanteItemLente[+i].IdLente, this.modelComprobanteItemLente[+i].MedidaEsferico, this.modelComprobanteItemLente[+i].MedidaCilindrico)
      .subscribe(result => {
        console.log(result)
        this.mostrarPrecio = true;
        console.log(this.parametro)
        if (result.Moneda == 'USD')
          this.modelComprobanteItemLente[+i].Precio = result.Precio * this.parametro.Dolar;
        else
          this.modelComprobanteItemLente[+i].Precio = result.Precio;
        if (i == 0) {
          this.modelComprobanteItemLente[0].Sobre = 0;
          this.modelComprobanteItemLente[+i].Cantidad = 1;
        }
    })
  }

  setInitialValue() {
    // this.filteredServicios
    //   // .pipe(take(1), takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     // setting the compareWith property to a comparison function
    //     // triggers initializing the selection according to the initial value of
    //     // the form control (i.e. _initializeSelection())
    //     // this needs to be done after the filteredBanks are loaded initially
    //     // and after the mat-option elements are available
    //     this.multiSelect.compareWith = (a: Servicio, b: Servicio) => a && b && a.Id === b.Id;
    //   });
      }

  getCalibrados() {
    this.servicioService.getCalibrados(this.data.idCliente)
      .subscribe(s => {
        this.servicios = s;
        // console.log(s)
        this.filteredServicios = this.serviciosControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterServicios(val))
        );
        // this.filteredServicios.next(this.servicios.slice());
        // this.bankMultiFilterCtrl.valueChanges
        //   // .pipe(takeUntil(this._onDestroy))
        //   .subscribe(() => {
        //     this.filterServicios();
        //   });
      })
  }

  serviciosSeleccionados(event: FormControl) {
    if (event.value != null && event.value != "") {
      let comprobanteItem = <ComprobanteItemServicio>{}
      comprobanteItem.IdServicio = event.value.Id;
      comprobanteItem.IdServicioNavigation = event.value;
      if (this.serviciosLente.find(c => c.IdServicio == comprobanteItem.IdServicio) == undefined) {
        this.serviciosLente.push(comprobanteItem);
        this.comprobanteItemServicioSelected();
      }
    }
    else {
      let i = this.serviciosLente.findIndex(s => s.IdServicioNavigation.DescripcionFactura.startsWith('CAL '));
      this.indiceCalibradoSelected(i);
    }
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
    this.modelComprobanteItemLente[0].Cantidad = +this.modelComprobanteItemLente[0].Cantidad + +this.modelComprobanteItemLente[1].Cantidad;
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

  filterServicios(nombre: any): Servicio[] {
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
    // if (!this.servicios) {
    //   return;
    // }
    // // get the search keyword
    // let search = this.bankMultiFilterCtrl.value;
    // if (!search) {
    //   this.filteredServicios.next(this.servicios.slice());
    //   return;
    // } else {
    //   search = search.toLowerCase();
    // }
    // // filter the banks
    // this.filteredServicios.next(
    //   this.servicios.filter(ser => ser.Id.toString().indexOf(search) !== -1 || ser.Nombre.toLowerCase().indexOf(search) > -1)
    // );
  }

  comprobanteItemLenteSelected() {
    this.selectedComprobanteItemLente.emit(this.modelComprobanteItemLente);
    // this.selectedServiciosComprobanteItem.emit(this.serviciosLente);
  }

  comprobanteItemServicioSelected() {
    let serviciosCloned = JSON.parse(JSON.stringify(this.serviciosLente));
    this.selectedServiciosComprobanteItem.emit(serviciosCloned);
  }

  indiceCalibradoSelected(i) {
    this.selectedIndiceCalibrados.emit(i);
  }

  compararLimiteGrilla(input, index, tipoGraduacion) {
    if (!input.includes('.')) {
      if (tipoGraduacion == 'esferico') {
        this.msjLimiteEsferico[index] = this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[index].MedidaEsferico, 'esferico')
      }
      else {
        this.msjLimiteCilindrico[index] = this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[index].MedidaCilindrico, 'cilindrico')
      }
    }
    // this.comprobanteItemLenteSelected()
  }

  cambiarSigno(i) {
    if (this.modelComprobanteItemLente[0].IdLenteNavigation.GraduacionesCilindricas == '-' && this.modelComprobanteItemLente[i].MedidaCilindrico != undefined) {
      // if (this.modelComprobanteItemLente[i].MedidaCilindrico >= 0) {        
      //   this.modelComprobanteItemLente[i].MedidaCilindrico = -this.modelComprobanteItemLente[i].MedidaCilindrico;
        this.validacionLenteService.divisionMedida(this.modelComprobanteItemLente[i], this.modelComprobanteItemLente[i].MedidaCilindrico, 'cilindrico');
      // }
    }
    else {
      if (this.modelComprobanteItemLente[i].MedidaCilindrico != undefined) {
        // this.cargarStock[i].MedidaCilindrico = +this.cargarStock[i].MedidaCilindrico;
        this.validacionLenteService.divisionMedida(this.modelComprobanteItemLente[i], this.modelComprobanteItemLente[i].MedidaCilindrico, 'cilindrico');
      }
    }
  }
}