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


  constructor(
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private limitesGrillaService: LimitesGrillaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      let cargarGraduacion= <ComprobanteItemLente>{};
      cargarGraduacion.Esferico = 0;
      cargarGraduacion.Cilindrico = 0;
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
      let idLimiteIzquierda;
      let idLimiteDerecha;
      this.modelComprobanteItemLente[0].IdLente = control.value.Id;
      this.modelComprobanteItemLente[0].IdLenteNavigation = control.value;
      let combinacion = control.value.Combinacion.split("  / ");
      if (combinacion[0] == '+ +') idLimiteIzquierda = 1;
      else idLimiteIzquierda = 3;
      if (combinacion[1] == '- +') idLimiteDerecha = 2;
      else idLimiteDerecha = 4;
      // combineLatest(
      //   this.limitesGrillaService.getById(idLimiteIzquierda),
      //   this.limitesGrillaService.getById(idLimiteDerecha)
      // ).subscribe(result => {
      //   this.limiteGrillaIzquierda = result[0];
      //   this.limiteGrillaDerecha = result[1];
      // });
    }
    // console.log(this.modelComprobanteItemLente)
  }

  traerPrecio(i){
    this.clienteService.getPrecioLenteFactura(this.data.idCliente, this.modelComprobanteItemLente[+i].IdLente, this.modelComprobanteItemLente[+i].Esferico, this.modelComprobanteItemLente[+i].Cilindrico)
    .subscribe(result => {
      this.mostrarPrecio = true;
      this.modelComprobanteItemLente[+i].Precio = result;
      this.modelComprobanteItemLente[+i].Cantidad = 1;
      if (i == 0)
        this.modelComprobanteItemLente[0].Sobre = 0;
    })
  }

  agregarGraduacion() {
    let item = <ComprobanteItemLente>{};
    item.IdLente = this.modelComprobanteItemLente[0].IdLente;
    item.Esferico = 0;
    item.Cilindrico = 0;
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

  // updateState() {
  //   //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
  //   //y el ngOnChanges() lo detecte
  //   let modelSoporteCloned = JSON.parse(JSON.stringify(this.modelSoporte));
  //   this.selectedSoportes.emit(modelSoporteCloned);
  // }
}