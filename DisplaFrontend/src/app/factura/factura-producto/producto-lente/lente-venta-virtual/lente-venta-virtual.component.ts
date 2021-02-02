import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Lente } from 'src/app/model/lente';
import { LenteService } from 'src/services/lente.service';
import { VentaVirtual } from 'src/app/model/ventaVirtual';

@Component({
  selector: 'app-lente-venta-virtual',
  templateUrl: './lente-venta-virtual.component.html',
  styleUrls: ['./lente-venta-virtual.component.css']
})
export class LenteVentaVirtualComponent implements OnInit {
  
  lentes: Lente[];
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;
  mostrarPrecio = false;
  modelVentaVirtual = <VentaVirtual>{};


  constructor(
    public dialogRef: MatDialogRef<LenteVentaVirtualComponent>,
    private lenteService: LenteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
    const pattern = /[0-9-.,]/;
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
    }
  }


  setIdLente(control) {
    if (control.value != null) {
      this.modelVentaVirtual.IdLente = control.value.Id;
      this.modelVentaVirtual.IdLenteNavigation = control.value;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
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