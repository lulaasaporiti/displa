import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LenteService } from 'src/services/lente.service';
import { Lente } from 'src/app/model/lente';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-lente-seleccion',
  templateUrl: './lente-seleccion.component.html',
  styleUrls: ['./lente-seleccion.component.css']
})
export class LenteSeleccionComponent implements OnInit {
  lentes: Lente[];
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;

  constructor(
    public dialogRef: MatDialogRef<LenteSeleccionComponent>,
    private lenteService: LenteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      console.log(this.lentes)
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

  onEnter(): void {
    if (this.data.idLente != "" && this.data.idLente != undefined)
      this.dialogRef.close(this.data);
  }

  setIdLente(control, data) {
    if (control.value != null) data.idLente = control.value.Id;
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
          lente.Id.toString().indexOf(s) !== -1);
  } else {
      return [];
  }
}

}
