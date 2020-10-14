import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
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
  selector: 'app-producto-lente',
  templateUrl: './producto-lente.component.html',
  styleUrls: ['./producto-lente.component.css']
})
export class ProductoLenteComponent implements OnInit {
  lentes: Lente[];
  selectedGraduacion = new EventEmitter<ComprobanteItemLente[]>();
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;
  limiteGrillaDerecha = <LimiteGrilla>{};
  limiteGrillaIzquierda = <LimiteGrilla>{};
  mostrarPrecio = false;
  modelComprobanteItemLente:  ComprobanteItemLente[] = [];


  constructor(
    public dialogRef: MatDialogRef<ProductoLenteComponent>,
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

  displayLente(l?: Lente): string | undefined {
    return l ? l.Id + ' - ' + l.Nombre : undefined;
  }

  private _filter(Nombre: string): Lente[] {
    const filterValue = Nombre.toLowerCase();
    return this.lentes.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
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

  traerPrecio(){
    this.clienteService.getPrecioLenteFactura(this.data.idCliente, this.modelComprobanteItemLente[0].IdLente, this.modelComprobanteItemLente[0].Esferico, this.modelComprobanteItemLente[0].Cilindrico)
    .subscribe(result => {
      this.mostrarPrecio = true;
      this.modelComprobanteItemLente[0].Precio = result;
      this.modelComprobanteItemLente[0].Cantidad = 1;
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
    // console.log(i)
    this.modelComprobanteItemLente.splice(+i, 1);
    // this.updateStateGraduacion();
  }

  // graduacionSelected() {
  //   this.updateStateGraduacion();
  // }

  // updateStateGraduacion() {
  //   //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
  //   //y el ngOnChanges() lo detecte
  //   let nuevaGraduacion = JSON.parse(JSON.stringify(this.modelComprobanteItemLente));
  //   this.selectedGraduacion.emit(nuevaGraduacion);
  // }

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
}