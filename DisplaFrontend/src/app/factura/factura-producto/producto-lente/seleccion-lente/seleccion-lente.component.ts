import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Lente } from 'src/app/model/lente';
import { LenteService } from 'src/services/lente.service';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { ClienteService } from 'src/services/cliente.service';
import { ComprobanteItemLente } from 'src/app/model/comprobanteItemLente';
import { ValidacionLenteService } from 'src/services/validacion.lente.service';

@Component({
  selector: 'app-seleccion-lente',
  templateUrl: './seleccion-lente.component.html',
  styleUrls: ['./seleccion-lente.component.css']
})
export class SeleccionLenteComponent implements OnInit {
  @Output() selectedComprobanteItemLente = new EventEmitter<any[]>(); 
  
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

  constructor(
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private validacionLenteService: ValidacionLenteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      let cargarGraduacion= <ComprobanteItemLente>{};
      cargarGraduacion.MedidaEsferico = 0;
      cargarGraduacion.MedidaCilindrico = 0;
      this.modelComprobanteItemLente.push(cargarGraduacion);
  }


  ngOnInit() {
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      this.mostrarPrecio = false;
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
      // console.log(this.modelComprobanteItemLente[0].IdLenteNavigation)
      
    }
    // console.log(this.modelComprobanteItemLente)
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

  comprobanteItemLenteSelected() {
    this.selectedComprobanteItemLente.emit(this.modelComprobanteItemLente);
  }

  compararLimiteGrilla(index, tipoGraduacion) {
    console.log(index)
    console.log(this.modelComprobanteItemLente[index])
    if (tipoGraduacion == 'esferico') {
      this.msjLimiteEsferico[index] = this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[index].MedidaEsferico, 'esferico')
    }
    else {
      this.msjLimiteCilindrico[index] = this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[index].MedidaCilindrico, 'cilindrico')
    }
  }

  // updateState() {
  //   //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
  //   //y el ngOnChanges() lo detecte
  //   let modelSoporteCloned = JSON.parse(JSON.stringify(this.modelSoporte));
  //   this.selectedSoportes.emit(modelSoporteCloned);
  // }
}