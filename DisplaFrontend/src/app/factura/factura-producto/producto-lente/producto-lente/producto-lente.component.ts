import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Lente } from 'src/app/model/lente';
import { LenteService } from 'src/services/lente.service';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { Directive, ElementRef, Input } from '@angular/core';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-producto-lente',
  templateUrl: './producto-lente.component.html',
  styleUrls: ['./producto-lente.component.css']
})
@Directive({
  selector: '[next-tab]',
})
export class ProductoLenteComponent implements OnInit {
  lentes: Lente[];
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;
  limiteGrillaDerecha = <LimiteGrilla>{};
  limiteGrillaIzquierda = <LimiteGrilla>{};

  
  

  constructor(
    public dialogRef: MatDialogRef<ProductoLenteComponent>,
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private limitesGrillaService: LimitesGrillaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
  }


  ngOnInit() {
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      this.filteredLentes = this.lentesControl.valueChanges
        .pipe(
          startWith(''),
          // map(value => typeof value === 'string' ? value : value.Nombre),
          map(val => this.filterLente(val))

          // map(Nombre => Nombre ? this._filter(Nombre) : this.lentes.slice())
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

  checkArrowKey(event: KeyboardEvent, el)
  {
    if (event.code == "Enter") {
      console.log("entros")
      console.log(el)
      event.preventDefault();

      let keyboardEvent = new KeyboardEvent('keydown', {
        "key": "Tab",
      });

      // el.srcElement.dispatchEvent(keyboardEvent);
      window.onkeyup(keyboardEvent)
      // console.log(keyboardEvent)
    }
  }

  setIdLente(control, data) {
    if (control.value != null) {
      let idLimiteIzquierda;
      let idLimiteDerecha;
      data.idLente = control.value.Id;
      let combinacion = control.value.Combinacion.split("  / ");
      if (combinacion[0] == '+ +') idLimiteIzquierda = 1;
      else idLimiteIzquierda = 3;
      if (combinacion[1] == '- +') idLimiteDerecha = 2;
      else idLimiteDerecha = 4;
      combineLatest(
        this.limitesGrillaService.getById(idLimiteIzquierda),
        this.limitesGrillaService.getById(idLimiteDerecha)
      ).subscribe(result => {
        this.limiteGrillaIzquierda = result[0];
        this.limiteGrillaDerecha = result[1];
      });
    }
  }

  traerPrecio(){
    if (this.data.MedidaEsferico != undefined && this.data.MedidaCilindrico != undefined)
    this.clienteService.getPrecioLenteFactura(this.data.idCliente, this.data.idLente, this.data.MedidaEsferico, this.data.MedidaCilindrico)
    .subscribe(result =>
       {

    })
    console.log(this.data.MedidaEsferico)
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
}